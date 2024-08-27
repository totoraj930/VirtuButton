import type { IKoffiCType, TypeSpec, TypeSpecWithAlignment } from 'koffi';

/**
 * Koffiのstructオブジェクト
 */
export type KoffiStruct = { [K: string]: TypeSpecWithAlignment };

/**
 * Koffiのstructオブジェクトからjsの型を作る
 */
export type KoffiStructInfer<T extends KoffiStruct> = RemoveReadonly<{
  [K in keyof T]: TypeSpecWithAlignmentToJsType<T[K]>;
}>;

type RemoveReadonly<T> = {
  -readonly [P in keyof T]: T[P];
};

type TypeSpecWithAlignmentToJsType<T extends TypeSpecWithAlignment> =
  T extends [number, infer U]
    ? U extends TypeSpec
      ? [number, TypeSpecToJsType<U>]
      : never
    : T extends TypeSpec
      ? TypeSpecToJsType<T>
      : never;

type TypeSpecToJsType<T extends TypeSpec> = T extends string
  ? KoffiStringToJsType<T>
  : IKoffiCType;

type KoffiStringToJsType<T extends string> = T extends keyof KoffiStringTypeMap
  ? KoffiStringTypeMap[T]
  : never;

type KoffiStringTypeMap = {
  void: undefined;
  int8: number;
  int8_t: number;
  uint8: number;
  uint8_t: number;
  char: number;
  uchar: number;
  char16: number;
  char16_t: number;
  int16: number;
  int16_t: number;
  uint16: number;
  uint16_t: number;
  short: number;
  ushort: number;
  char32: number;
  char32_t: number;
  int32: number;
  int32_t: number;
  uint32: number;
  uint32_t: number;
  int: number;
  uint: number;
  int64: number;
  int64_t: number;
  uint64: number;
  uint64_t: number;
  longlong: number;
  ulonglong: number;
  float32: number;
  float64: number;
  float: number;
  double: number;
  bool: boolean;
  long: number;
  ulong: number;
  intptr: number;
  intptr_t: number;
  uintptr: number;
  uintptr_t: number;
  wchar_t: number;
  str: string;
  string: string;
  str16: string;
  string16: string;
  str32: string;
  string32: string;
};
