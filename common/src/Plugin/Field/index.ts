import { PluginFieldValues, PluginStaticFields } from './type';

export type * from './type';
export * from './schema';

// PluginFieldsから初期値のActionParamsを作る
export function getDefaultFieldValues<T extends PluginStaticFields>(
  fields: T
): PluginFieldValues<T> {
  const props: Record<string, any> = {};
  for (const key in fields) {
    const prop = fields[key];
    props[key] = prop.default;
  }
  return props as PluginFieldValues<T>;
}
