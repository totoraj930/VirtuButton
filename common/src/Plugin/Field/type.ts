import { VirtualKey } from '../../Keyboard/windows';

interface FieldBase {
  type: string;
  name: string;
  description?: string;
  default: any;
  disabled?: boolean;
}

/**
 * input[type=text]として表示されます
 */
export interface StringField extends FieldBase {
  type: 'string';
  default: string;
  placeholder?: string;
}

/**
 * input[type=number]として表示されます
 */
export interface NumberField extends FieldBase {
  type: 'number';
  default: number;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
}

/**
 * textareaとして表示されます
 * 生のjsonを受け取ったり脱出ハッチとしても使えます
 */
export interface TextField extends FieldBase {
  type: 'text';
  default: string;
  placeholder?: string;
}

/**
 * input[type=checkbox]として表示されます
 */
export interface BooleanField extends FieldBase {
  type: 'boolean';
  default: boolean;
}

// SelectPropは型補完が効くように特別に別途定義

/**
 * select > optgroupとして表示されます
 * 次のSelectOptionGroupまでがグループ範囲になります
 */
export type SelectOptionGroup = {
  type: 'group';
  name: string;
};

/**
 * 現在使用できません
 */
export type SelectOptionHr = {
  type: 'hr';
};

/**
 * select > (optgroup) > optionとして表示されます
 */
export type SelectOptionK<K extends string> = {
  key: K;
  name: string;
};

/**
 * selectのoptionなどを定義します
 */
export type SelectOption<K extends string> =
  | SelectOptionK<K>
  | SelectOptionGroup
  | SelectOptionHr;

/**
 * selectとして表示されます
 * ジェネリクスでvalueとなるunion型を指定します
 */
export interface SelectField<K extends string = string> extends FieldBase {
  type: 'select';
  options: SelectOption<K>[];
  default: K;
}

/**
 * キー入力のinputです
 * 同時押しにも対応しています
 */
export interface KeyCombinationField extends FieldBase {
  type: 'keyCombination';
  default: VirtualKey[];
  placeholder?: string;
}

/**
 * アクションに登録するプロパティです
 */
export type PluginInputField =
  | StringField
  | TextField
  | NumberField
  | BooleanField
  | SelectField<any>
  | KeyCombinationField;

export type PluginFieldsError = string;

export type PluginFieldMap = Record<string, PluginInputField>;

export type PluginStaticFields<T extends PluginFieldMap = PluginFieldMap> = T;
export type PluginDynamicFields<T extends PluginFieldMap = PluginFieldMap> = (
  initValues?: PluginFieldValues<T>
) => T | Promise<T>;

/**
 * アクションに登録するプロパティの集まりです
 */
export type PluginFields<T extends PluginFieldMap = PluginFieldMap> =
  | PluginStaticFields<T>
  | PluginDynamicFields<T>;

/**
 * フロントに送られるFieldsはID
 * usePluginFieldsで取得する
 */
export type PluginFieldsPayload = string;

// 各プロパティのデフォルト値の型を取得
type DefaultType<T> = T extends { default: infer D } ? ValueType<D> : never;

type ValueType<T> = T;
// type ValueType<T> = T extends string
//   ? string
//   : T extends number
//     ? number
//     : T extends boolean
//       ? boolean
//       : T;

type PromiseType<T> = T extends Promise<infer P> ? P : T;

// PluginFieldsをPluginFieldMapにするやつ
// 使ってない
export type PluginFieldsToFieldMap<T> =
  T extends Record<string, PluginInputField>
    ? T
    : T extends PluginDynamicFields<any>
      ? PromiseType<ReturnType<T>>
      : never;

/**
 * アクションの実行時に受け取るパラメータです
 * ActionPropsから生成されます
 */
export type PluginFieldValues<T extends PluginFieldMap = PluginFieldMap> = {
  [K in keyof T]: DefaultType<T[K]>;
};
