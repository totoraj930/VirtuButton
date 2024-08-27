import {
  PluginFields,
  PluginFieldValues,
  VBError,
} from '@virtu-button/common/Plugin';
import { ulid } from 'ulid';

// PluginFieldsの実態を管理する

export const pluginFieldsList: Map<string, PluginFields> = new Map();

/**
 * PluginFieldsを追加してfieldsIdを発行する
 */
export function addPluginFields(fields: PluginFields) {
  const fieldsId = ulid();
  pluginFieldsList.set(fieldsId, fields);
  return fieldsId;
}

/**
 * fieldsIdからPluginStaticFieldsを生成して返す
 */
export async function getStaticFields(
  fieldsId: string,
  initValues?: PluginFieldValues
) {
  const rawFields = pluginFieldsList.get(fieldsId);
  if (!rawFields) {
    throw new VBError('PluginFieldsが見つかりませんでした');
  }
  if (typeof rawFields === 'function') {
    return await rawFields(initValues);
  } else {
    return rawFields;
  }
}
