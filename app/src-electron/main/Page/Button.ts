import {
  ButtonHandler,
  ButtonTask,
  getDefaultFieldValues,
  PluginActionSerialized,
  PluginEventSerialized,
} from '@virtu-button/common/Plugin';
import { ulid } from 'ulid';
import { getStaticFields } from '../Plugin/Field';
import { getPageItemAll } from './PageItem';

export function getButtonAll() {
  return getPageItemAll().filter((item) => item.type === 'Button');
}

/**
 * PluginActionからButtonTaskを生成
 */
export async function getNewTask(
  action: PluginActionSerialized
): Promise<ButtonTask> {
  try {
    const fields = await getStaticFields(action.fieldsId);
    const params = getDefaultFieldValues(fields);
    console.log(params);
    return {
      id: ulid(),
      pluginId: action.pluginId,
      actionId: action.id,
      fieldValues: params,
    };
  } catch {
    return {
      id: ulid(),
      pluginId: action.pluginId,
      actionId: action.id,
      fieldValues: {},
    };
  }
}

export async function getNewHandler(
  event: PluginEventSerialized
): Promise<ButtonHandler> {
  try {
    const fields = await getStaticFields(event.fieldsId);
    const params = getDefaultFieldValues(fields);
    console.log(params);
    return {
      id: ulid(),
      event: {
        pluginId: event.pluginId,
        eventId: event.id,
        fieldValues: params,
      },
      tasks: [],
    };
  } catch {
    return {
      id: ulid(),
      event: {
        pluginId: event.pluginId,
        eventId: event.id,
        fieldValues: {},
      },
      tasks: [],
    };
  }
}
