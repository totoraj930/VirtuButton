import { PluginAction } from './Action';
import { ButtonViewProps } from './Button';
import { ControlButton } from './ControlButton';
import { AddPluginEventListener, PluginEvent } from './Event';
import { PluginFieldMap, PluginFieldValues } from './Field/type';

/**
 * イベントを発行する関数
 *
 * @param {Object} props - イベントのプロパティ
 * @param {string} props.eventId - 発行するイベントのID
 * @param {string} [props.pluginId] - プラグインID(指定しなければ所属プラグインのID)
 * @param {string} [props.buttonId] - 特定のボタンにのみ発行する場合に指定
 * @param {PluginFieldValues} [props.fieldValues] - 特定のfieldValuesが設定されているハンドラのみに発行する場合
 * @param {PluginFieldValues} [props.excludeValues] - 特定のfieldValuesが設定されているハンドラを除外する
 * @param {any[]} [props.args] - イベントハンドラに渡される引数
 */
export type PluginEventEmitter = <
  T extends PluginFieldMap = PluginFieldMap,
>(props: {
  eventId: string;
  pluginId?: string;
  buttonId?: string;
  fieldValues?: Partial<PluginFieldValues<T>>;
  excludeValues?: Partial<PluginFieldValues<T>>;
  args?: any[];
}) => void;

/**
 * プラグインの初期化時に渡されるプロパティ
 */
export type PluginInitProps = {
  /**
   * プラグインで登録されたイベントを発行する関数
   */
  emitPluginEvent: PluginEventEmitter;

  /**
   * プラグインで登録されたイベントにリスナーを登録する
   */
  addPluginEventListener: AddPluginEventListener;

  updateItemViewProps: (
    itemId: string,
    props: Partial<ButtonViewProps>
  ) => void;

  /**
   * PageItemのstyleIndexを変えます
   */
  updateStyleIndex: (itemId: string, styleIndex: number) => void;

  /**
   * プラグインが存在するディレクトリのパス
   */
  pluginPath: string;
};

/**
 * プラグイン
 */
export type VirtuButtonPlugin = {
  /**
   * スキーマのバージョン
   */
  schemaVersion: 1;
  /**
   * プラグインの識別用ID
   * 他プラグインと被らない固定のstringである必要があります
   */
  id: string;
  /**
   * プラグインの表示名
   */
  name: string;
  /**
   * プラグインの説明
   * マークダウンが使えます
   */
  description: string;
  /**
   * プラグインがロードされたときに呼ばれます
   * @param props 初期化時に渡されるプロパティ
   * @returns 初期化処理が失敗したならrejectするかerrorを投げる
   */
  init: (props: PluginInitProps) => Promise<void>;
  /**
   * プラグインで追加するPluginEventのリスト
   */
  events: PluginEvent<any>[] | readonly PluginEvent<any>[];
  /**
   * プラグインで追加するPluginActionのリスト
   */
  actions: PluginAction<any>[] | readonly PluginAction<any>[];
  /**
   * プラグインで追加するControlButtonのリスト
   */
  controlButtons: ControlButton<any>[] | readonly ControlButton<any>[];
};

/**
 * フロントで使う用
 */
export type VBPluginSerialized = Omit<
  VirtuButtonPlugin,
  'init' | 'events' | 'actions' | 'controlButtons'
>;
