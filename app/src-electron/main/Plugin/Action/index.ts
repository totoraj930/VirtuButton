import {
  PluginAction,
  PluginActionAdapted,
  PluginActionSerialized,
  zPluginAction,
} from '@virtu-button/common/Plugin';
import { addPluginFields } from '../Field';

/**
 * key: actionId
 */
export type PluginActionMap = Map<string, PluginActionAdapted>;

/**
 * プラグインに登録されているアクション
 * key: pluginId
 */
export const pluginActionMaps: Map<string, PluginActionMap> = new Map();

/**
 * アクションを取得する
 * @param pluginId プラグインのID
 * @param actionId アクションのID
 */
export function getPluginAction(pluginId: string, actionId: string) {
  return pluginActionMaps.get(pluginId)?.get(actionId);
}

/**
 * フロントの表示用PluginActionリストを返す
 */
export function getPluginActionPayloadAll(): PluginActionSerialized[] {
  const plugins = Array.from(pluginActionMaps.values());
  const res: PluginActionSerialized[] = [];
  for (const plugin of plugins) {
    const actions = Array.from(plugin.values()).map(
      ({ id, pluginId, name, fieldsId, description }) => {
        return {
          id,
          pluginId,
          name,
          fieldsId,
          description,
        };
      }
    );
    res.push(...actions);
  }
  return res;
}

// アクションを登録する
export function addPluginAction(pluginId: string, action: PluginAction) {
  let actionMap = pluginActionMaps.get(pluginId);
  if (!actionMap) {
    actionMap = new Map();
    pluginActionMaps.set(pluginId, actionMap);
  }
  const { fields, ...props } = action;
  const fieldsId = addPluginFields(fields);
  actionMap.set(action.id, { ...props, pluginId, fieldsId });
}

// アクションをまとめて登録する
export function addPluginActions(pluginId: string, ...actions: PluginAction[]) {
  for (const action of actions) {
    addPluginAction(pluginId, action);
  }
}

// 生のアクションを検証する
export function isValidPluginAction(rawAction: any): rawAction is PluginAction {
  try {
    const action = zPluginAction.parse(rawAction);
    // const props = Object.keys(action.props).map((key) => action.props[key]);
    // for (const prop of props) {
    //   if (prop.type !== 'select') continue;
    //   const hasDefault = prop.options.find((ops) => {
    //     if ('key' in ops && ops.key === prop.default) {
    //       return true;
    //     }
    //   });
    //   if (!hasDefault) {
    //     throw new Error(
    //       `action(${action.id}): SelectPropの初期値がoptionsに存在しません`
    //     );
    //   }
    // }
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}
