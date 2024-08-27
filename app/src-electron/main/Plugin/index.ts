import {
  VirtuButtonPlugin as Plugin,
  PluginEventEmitter,
  PluginInitProps,
  VBPluginSerialized,
  zVirtuButtonPlugin,
} from '@virtu-button/common/Plugin';
import { ZodError } from 'zod';
import {
  addCBBases,
  editPageItemStyleIndex,
  editPageItemViewProps,
  getCBInstanceFromPluginId,
  mountPageItem,
} from '../Page';
import { addPluginActions, isValidPluginAction } from './Action';
import {
  addPluginEventListener,
  addPluginEvents,
  emitPluginEvent,
} from './Event';

/**
 * プラグインのあるディレクトリのパスも追加する必要がある
 */
export type PluginWithPath = Plugin & { path: string };

/**
 * ロードされたプラグイン
 */
export const virtuButtonPlugins: Map<string, PluginWithPath> = new Map();

/**
 * エラーが出て初期化に失敗したプラグイン
 */
export const errorPlugins: Set<Plugin> = new Set();

export function getPluginPayloadAll(): VBPluginSerialized[] {
  return Array.from(virtuButtonPlugins.values()).map((plugin) => {
    return {
      id: plugin.id,
      name: plugin.name,
      description: plugin.description,
      schemaVersion: plugin.schemaVersion,
    };
  });
}

export function initAllPluginCB() {
  for (const plugin of Array.from(virtuButtonPlugins.values())) {
    addCBBases(plugin.id, ...plugin.controlButtons);
  }
}

/**
 * プラグインの初期化処理を呼ぶ
 */
export async function initAllPlugin() {
  const promises = Array.from(virtuButtonPlugins.values()).map(
    async (plugin) => {
      try {
        const emitter: PluginEventEmitter = ({
          pluginId = plugin.id,
          eventId,
          buttonId,
          fieldValues,
          excludeValues,
          args = [],
        }) => {
          emitPluginEvent({
            pluginId,
            eventId,
            buttonId,
            fieldValues,
            excludeValues,
            args,
          });
        };

        const props: PluginInitProps = {
          emitPluginEvent: emitter,
          addPluginEventListener,
          pluginPath: plugin.path,
          updateStyleIndex: (id, index) => {
            editPageItemStyleIndex(id, index);
          },
          updateItemViewProps: editPageItemViewProps,
        };
        // 初期化処理
        await plugin.init(props);
        // 初期化に成功したらactionsを登録
        addPluginActions(plugin.id, ...plugin.actions);

        // 初期化に成功したらeventsを登録
        addPluginEvents(plugin.id, ...plugin.events);
      } catch (e) {
        console.log(e);
        // エラーが出たらプラグインを削除する
        virtuButtonPlugins.delete(plugin.id);
        // エラーが出たプラグインとして登録する
        errorPlugins.add(plugin);
      }

      // 初期化に成功したらControlButtonInstanceを接続する
      const cbInstances = getCBInstanceFromPluginId(plugin.id);
      for (const cbInstance of cbInstances) {
        mountPageItem(cbInstance);
      }
    }
  );
  return await Promise.allSettled(promises);
}

/**
 * プラグインを登録する
 */
export function addPlugin(plugin: PluginWithPath) {
  virtuButtonPlugins.set(plugin.id, plugin);
}

/**
 * プラグインをまとめて登録する
 */
export function addPlugins(...plugins: PluginWithPath[]) {
  for (const plugin of plugins) {
    addPlugin(plugin);
  }
}

/**
 * 生のプラグインを検証する
 */
export function isValidPlugin(rawPlugin: any): rawPlugin is Plugin {
  try {
    const plugin = zVirtuButtonPlugin.parse(rawPlugin);
    for (const action of plugin.actions) {
      // プラグインのアクションのチェックもする
      if (!isValidPluginAction(action)) {
        return false;
      }
    }
    return true;
  } catch (e) {
    if (e instanceof ZodError) {
      console.error(JSON.stringify(e.errors, null, '  '));
    }
    return false;
  }
}
