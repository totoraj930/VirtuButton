import {
  AddPluginEventListener,
  PluginEvent,
  PluginEventAdapted,
  PluginEventListener,
  PluginEventParams,
  PluginEventSerialized,
  zPluginEvent,
} from '@virtu-button/common/Plugin';
import { getButtonAll } from '../../Page';
import { runButtonTasks } from '../Action/task';
import { addPluginFields } from '../Field';

/**
 * 登録されているPluginEvent
 */
export const pluginEvents: PluginEventAdapted[] = [];

export const pluginEventListeners: PluginEventListener[] = [];

/**
 * PluginEventのリスナを登録
 */
export const addPluginEventListener: AddPluginEventListener = (listener) => {
  pluginEventListeners.push(listener);
  return () => {
    pluginEventListeners.filter((target) => target !== listener);
  };
};

/**
 * PluginEventを発行する
 */
export function emitPluginEvent({
  eventId,
  pluginId,
  buttonId,
  fieldValues,
  excludeValues,
  args,
}: PluginEventParams) {
  // リスナーに対しての処理
  for (const listener of pluginEventListeners) {
    // 指定のリスナーじゃなければスキップ
    if (listener.eventId !== eventId || listener.pluginId !== pluginId) {
      continue;
    }
    // buttonIdの指定があってリスナーと一致していなければスキップ
    if (buttonId && listener.buttonId !== buttonId) {
      continue;
    }
    let skipFlag = false;
    // fieldValuesの指定があるなら確認
    if (fieldValues && listener.fieldValues) {
      for (const key in fieldValues) {
        // 1つでも違うfieldがあればスキップ
        if (fieldValues[key] !== listener.fieldValues[key]) {
          skipFlag = true;
          break;
        }
      }
    }

    // excludeValuesの指定があるなら確認
    if (!skipFlag && excludeValues && listener.fieldValues) {
      skipFlag = true;
      for (const key in excludeValues) {
        // fieldが全て一致したらスキップ
        if (excludeValues[key] !== listener.fieldValues) {
          skipFlag = false;
          break;
        }
      }
    }
    if (skipFlag) continue;
    // argsをhandlerに渡す
    listener.handler(...args);
  }

  // Buttonに対しての処理
  const buttons = getButtonAll();
  for (const button of buttons) {
    for (const handler of button.handlers) {
      const { event } = handler;
      // 指定のリスナーじゃなければスキップ
      if (event.eventId !== eventId || event.pluginId !== pluginId) {
        continue;
      }
      // buttonIdの指定があってリスナーと一致していなければスキップ
      if (buttonId && button.id !== buttonId) {
        continue;
      }

      let skipFlag = false;
      // fieldValuesの指定があるなら確認
      if (fieldValues && handler.event.fieldValues) {
        for (const key in fieldValues) {
          // 1つでも違うfieldがあればスキップ
          if (fieldValues[key] !== handler.event.fieldValues[key]) {
            skipFlag = true;
            break;
          }
        }
      }

      // excludeValuesの指定があるなら確認
      if (!skipFlag && excludeValues && handler.event.fieldValues) {
        skipFlag = true;
        for (const key in excludeValues) {
          // fieldが全て一致したらスキップ
          if (excludeValues[key] !== handler.event.fieldValues[key]) {
            skipFlag = false;
            break;
          }
        }
      }

      if (skipFlag) continue;
      // fromを設定してtasksを実行
      runButtonTasks(handler.tasks, {
        buttonId: button.id,
        event: {
          eventId,
          pluginId,
          buttonId,
          args,
        },
      });
    }
  }
}

/**
 * PluginEventを取得する
 */
export function getPluginEvent(pluginId: string, eventId: string) {
  return pluginEvents.find(
    (event) => event.pluginId === pluginId && event.id === eventId
  );
}

/**
 * 登録されてるPluginEventを全て返す
 */
export function getPluginEventPayloadAll(): PluginEventSerialized[] {
  return pluginEvents.map((event) => {
    return {
      id: event.id,
      pluginId: event.pluginId,
      name: event.name,
      description: event.description,
      fieldsId: event.fieldsId,
    };
  });
}

/**
 * PluginEventを追加する
 */
export function addPluginEvent(pluginId: string, event: PluginEvent) {
  const { fields, ...props } = event;
  const fieldsId = addPluginFields(fields);
  pluginEvents.push({
    ...props,
    pluginId,
    fieldsId,
  });
}

/**
 * PluginEventをまとめて追加する
 */
export function addPluginEvents(pluginId: string, ...events: PluginEvent[]) {
  for (const event of events) {
    addPluginEvent(pluginId, event);
  }
}

/**
 * 生のPluginEventを検証する
 */
export function isValidPluginEvent(rawEvent: any): rawEvent is PluginEvent {
  try {
    const event = zPluginEvent.parse(rawEvent);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}
