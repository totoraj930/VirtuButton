import { Button, ButtonTask, ButtonSerialized, ButtonAdapted } from './type';
export type * from './type';
export * from './schema';
export * from './icon';
/**
 * ボタンの初期値を返す
 */
export declare function getDefaultButton(): Button;
export declare function toButtonSerialized(button: ButtonAdapted): ButtonSerialized;
export declare function getDefaultButtonTask(): ButtonTask;
