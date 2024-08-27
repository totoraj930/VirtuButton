// 外部から利用したいのでクリーンに保つ

import { PluginEventParams } from '../Event';
import { PluginFieldMap, PluginFields, PluginFieldValues } from '../Field/type';

/**
 * アクションの実行結果の型
 * 次のアクションに渡すために使う
 */
export type ActionResult = {
  /**
   * 実行されたアクションの所属プラグイン
   */
  pluginId: string;
  /**
   * 実行されたアクションのID
   */
  actionId: string;
  /**
   * 実行されたアクションに渡したActionParams
   */
  fieldValues: PluginFieldValues<PluginFieldMap>;
  /**
   * 実行結果
   */
  value: any;
};

/**
 * アクションの実行時に受け取るpayloadです
 * Actionが実行された状況など
 */
export type ActionPayload = {
  /**
   * アクションの実行元
   */
  from: {
    /**
     * アクションの所属ボタンID
     */
    buttonId?: string;
    /**
     * アクションが実行されたイベントのプロパティ
     */
    event?: PluginEventParams;
  };
  /**
   * 直前のPluginActionの結果
   */
  prevResult?: ActionResult;
  /**
   * これ以降のアクションを止める場合に呼ぶ関数
   */
  stopNextActions: () => void;
};

export type PluginAction<T extends PluginFieldMap = PluginFieldMap> = {
  id: string;
  name: string;
  description?: string;
  run: (
    fieldValues: PluginFieldValues<T>,
    payload: ActionPayload
  ) => Promise<any> | any;
  fields: PluginFields<T>;
};

// 実際に登録されたあとの型
export type PluginActionAdapted<T extends PluginFieldMap = PluginFieldMap> =
  Omit<PluginAction<T>, 'fields'> & { pluginId: string; fieldsId: string };

// フロントで使う用
export type PluginActionSerialized<T extends PluginFieldMap = PluginFieldMap> =
  Omit<PluginActionAdapted<T>, 'run'>;
