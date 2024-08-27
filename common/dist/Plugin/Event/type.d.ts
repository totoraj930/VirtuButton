import { PluginFieldMap, PluginFields, PluginFieldValues } from '../Field/type';
/**
 * プラグインでemitするイベント
 */
export type PluginEvent<T extends PluginFieldMap = PluginFieldMap> = {
    /**
     * イベントの識別子
     * プラグイン内で一意である必要があります
     */
    id: string;
    /**
     * イベントの表示名
     */
    name: string;
    /**
     * イベントの説明
     */
    description?: string;
    fields: PluginFields<T>;
};
/**
 * pluginId付き
 */
export type PluginEventAdapted = Omit<PluginEvent, 'fields'> & {
    pluginId: string;
    fieldsId: string;
};
/**
 * フロントで使う用
 */
export type PluginEventSerialized = PluginEventAdapted;
/**
 * PluginEventを発行するときのプロパティ
 */
export type PluginEventParams = {
    eventId: string;
    pluginId: string;
    buttonId?: string;
    args: any[];
    fieldValues?: Partial<PluginFieldValues>;
    excludeValues?: Partial<PluginFieldValues>;
};
/**
 * リスナー
 */
export type PluginEventListener = {
    eventId: string;
    pluginId: string;
    buttonId: string;
    fieldValues?: PluginFieldValues;
    handler: (...args: PluginEventParams['args']) => any;
};
/**
 * リスナーを削除
 */
type RemoveListenerFunc = () => void;
/**
 * リスナー登録関数の型
 */
export type AddPluginEventListener = (listener: PluginEventListener) => RemoveListenerFunc;
export {};
