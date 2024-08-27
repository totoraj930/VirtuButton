import { ButtonStyle, ButtonViewProps } from '../Button';
import { PluginFieldMap, PluginFields, PluginFieldValues } from '../Field';
/**
 * 生成されるControlButtonの実体
 */
export type ControlButtonInstance<T extends PluginFieldMap = PluginFieldMap> = {
    type: 'ControlButton';
    id: string;
    pluginId: string;
    controlButtonId: string;
    fieldValues: PluginFieldValues<T>;
    styles: ButtonStyle[];
    viewProps: ButtonViewProps;
};
/**
 * 内部処理用に登録される
 */
export type CBInstanceAdapted = ControlButtonInstance & {
    error?: string;
};
/**
 * 保存や表示に使うControlButton
 */
export type CBInstanceSerialized = CBInstanceAdapted;
/**
 * プラグインが返すControlButton
 */
export type ControlButton<T extends PluginFieldMap = PluginFieldMap> = {
    id: string;
    name: string;
    description?: string;
    styles: ButtonStyle[];
    onClick?: (instance: ControlButtonInstance<T>) => Promise<any>;
    onDown?: (instance: ControlButtonInstance<T>) => Promise<any>;
    onUp?: (instance: ControlButtonInstance<T>) => Promise<any>;
    onMount: (instance: ControlButtonInstance<T>) => Promise<any>;
    onDestroy: (instance: ControlButtonInstance<T>) => Promise<any>;
    fields: PluginFields<T>;
};
export type ControlButtonAdapted = Omit<ControlButton, 'fields'> & {
    pluginId: string;
    fieldsId: string;
};
export type ControlButtonSerialized = Omit<ControlButtonAdapted, 'onClick' | 'onDown' | 'onUp' | 'onMount' | 'onDestroy'>;
