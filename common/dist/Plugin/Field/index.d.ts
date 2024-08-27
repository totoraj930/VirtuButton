import { PluginFieldValues, PluginStaticFields } from './type';
export type * from './type';
export * from './schema';
export declare function getDefaultFieldValues<T extends PluginStaticFields>(fields: T): PluginFieldValues<T>;
