import {
  CBInstanceAdapted,
  ControlButton,
  ControlButtonAdapted,
  ControlButtonInstance,
  ControlButtonSerialized,
  getDefaultFieldValues,
  zButtonViewProps,
} from '@virtu-button/common/Plugin';
import { dialog } from 'electron';
import { ulid } from 'ulid';
import { virtuButtonPlugins } from '../Plugin';
import { addPluginFields, getStaticFields } from '../Plugin/Field';
import { getPageItem, getPageItemsFromType } from './PageItem';

export const controlButtonBases: ControlButtonAdapted[] = [];

// export const cbInstanceAdapteds: Map<string, CBInstanceAdapted> = new Map();

/**
 * ControlButtonを返す
 */
export function getCBBase(pluginId: string, cbId: string) {
  const cbBase = controlButtonBases.find(
    (v) => v.pluginId === pluginId && v.id === cbId
  );
  return cbBase ?? null;
}

export function addCBBase(pluginId: string, cbBase: ControlButton) {
  const { fields, ...props } = cbBase;
  const fieldsId = addPluginFields(fields);
  controlButtonBases.push({ ...props, pluginId, fieldsId });
}

export function addCBBases(pluginId: string, ...cbBases: ControlButton[]) {
  for (const cbBase of cbBases) {
    addCBBase(pluginId, cbBase);
  }
}

/**
 * 設定からControlButtonInstanceを追加する
 */
export function adaptCBInstance(
  instance: ControlButtonInstance
): CBInstanceAdapted {
  return instance;
}

/**
 * InstanceをPluginから切断する
 */
export async function destroyCBInstance(instance: CBInstanceAdapted) {
  const cbBase = getCBBase(instance.pluginId, instance.controlButtonId);
  const plugin = virtuButtonPlugins.get(instance.pluginId);
  try {
    if (cbBase && plugin) {
      await cbBase.onDestroy(instance);
    }
  } catch {}
}

/**
 * InstanceをPluginに接続する
 */
export async function mountCBInstance(
  instance: CBInstanceAdapted
): Promise<CBInstanceAdapted> {
  const cbBase = getCBBase(instance.pluginId, instance.controlButtonId);
  const plugin = virtuButtonPlugins.get(instance.pluginId);
  try {
    if (cbBase && plugin) {
      await cbBase.onMount(instance);
      const prevInstance = getPageItem(instance.id) as CBInstanceAdapted;
      const { error, ...newInstance } = prevInstance;
      return newInstance;
    }
  } catch (e) {
    const prevInstance = getPageItem(instance.id) as CBInstanceAdapted;
    if (e instanceof Error) {
      return { ...prevInstance, error: e.message };
    }
    return {
      ...prevInstance,
      error: 'ボタンをプラグインに接続できませんでした',
    };
  }
  return { ...instance, error: '対象のControlButtonが見つかりませんでした' };
}

export function getCBInstanceFromPluginId(pluginId: string) {
  return getPageItemsFromType('ControlButton').filter(
    (instance) => instance.pluginId === pluginId
  );
}

/**
 * CBInstanceのイベントを発火させる
 */
export async function emitCBInstanceEvent(
  id: string,
  event: 'onClick' | 'onDown' | 'onUp'
) {
  const instance = getPageItem(id);
  if (!instance || instance.type !== 'ControlButton') return;
  const cbBase = getCBBase(instance.pluginId, instance.controlButtonId);
  if (!cbBase) return;
  const f = cbBase[event];
  if (!f) return;
  try {
    await f(instance);
  } catch (e) {
    const msg = e instanceof Error ? e.message : '';
    const { styles, viewProps, ...from } = instance;
    const msgs = [
      'ボタンでエラーが発生しました',
      `${JSON.stringify(from, null, '  ')}`,
      msg,
    ];
    dialog.showErrorBox('ボタンエラー', msgs.join('\n'));
  }
}

export async function getNewCBInstance(
  pCB: ControlButtonSerialized
): Promise<ControlButtonInstance> {
  const fields = await getStaticFields(pCB.fieldsId);
  const fieldValues = getDefaultFieldValues(fields);
  return {
    id: ulid(),
    controlButtonId: pCB.id,
    pluginId: pCB.pluginId,
    fieldValues,
    styles: structuredClone(pCB.styles),
    viewProps: zButtonViewProps.parse({ zIndex: 100 }),
    type: 'ControlButton',
  };
}

export function getCBPayloadAll() {
  return controlButtonBases.map((cb): ControlButtonSerialized => {
    const { onDestroy, onMount, onClick, onDown, onUp, ...props } = cb;
    return props;
  });
}
