import { PluginActionSerialized } from '../Action';
import { PluginFieldValues } from '../Field/type';
/**
 * ボタンのタスク(実際にActionを実行するときのやつ)
 */
export type ButtonTask = {
    id: string;
    pluginId: PluginActionSerialized['pluginId'];
    actionId: PluginActionSerialized['id'];
    fieldValues: PluginFieldValues;
};
/**
 * ボタンに登録されているハンドラ
 */
export type ButtonHandler = {
    /**
     * ハンドラのID
     */
    id: string;
    /**
     * 実行のトリガーとなるイベント
     */
    event: {
        eventId: string;
        pluginId: string;
        fieldValues: PluginFieldValues;
    };
    /**
     * 実行するタスク
     */
    tasks: ButtonTask[];
};
type MaterialSymbol = string;
/**
 * ボタンのスタイル
 */
export type ButtonStyle = {
    text: string;
    textSize: number;
    color: {
        background: string;
        text: string;
    };
    image?: string;
    icon?: MaterialSymbol;
    bgOpacity: number;
};
/**
 * ボタンを表示する際に使うプロパティ
 */
export type ButtonViewProps = {
    x: number;
    y: number;
    w: number;
    h: number;
    zIndex: number;
    styleIndex: number;
    temp?: {
        title?: string;
    };
};
/**
 * 実際の処理に使うボタン
 */
export type Button = {
    id: string;
    type: 'Button';
    handlers: ButtonHandler[];
    styles: ButtonStyle[];
    viewProps: ButtonViewProps;
};
export type ButtonAdapted = Button & {
    error?: string;
};
/**
 * 表示する際に使う情報
 */
export type ButtonSerialized = ButtonAdapted;
export {};
