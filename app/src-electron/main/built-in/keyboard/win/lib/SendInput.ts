import koffi from 'koffi';
import { KoffiStructInfer } from './koffiType';
import { user32 } from './user32';

const MOUSEINPUT = {
  dx: 'long',
  dy: 'long',
  mouseData: 'uint',
  dwFlags: 'uint',
  time: 'uint',
  dwExtraInfo: 'uintptr_t',
} as const;
export type MOUSEINPUT = KoffiStructInfer<typeof MOUSEINPUT>;
export const MOUSEINPUT_koffi = koffi.struct(MOUSEINPUT);

const KEYBDINPUT = {
  wVk: 'ushort',
  wScan: 'ushort',
  dwFlags: 'uint',
  time: 'uint',
  dwExtraInfo: 'uintptr_t',
} as const;
export type KEYBDINPUT = KoffiStructInfer<typeof KEYBDINPUT>;
export const KEYBDINPUT_koffi = koffi.struct(KEYBDINPUT);

export enum dwFlags {
  KEYEVENTF_EXTENDEDKEY = 0x0001,
  KEYEVENTF_KEYUP = 0x0002,
  KEYEVENTF_SCANCODE = 0x0008,
  KEYEVENTF_UNICODE = 0x0004,
}

const HARDWAREINPUT = {
  uMsg: 'uint',
  wParamL: 'ushort',
  wParamH: 'ushort',
} as const;
export type HARDWAREINPUT = KoffiStructInfer<typeof HARDWAREINPUT>;
export const HARDWAREINPUT_koffi = koffi.struct(HARDWAREINPUT);

const INPUT = {
  type: 'uint32',
  u: koffi.union({
    mi: MOUSEINPUT_koffi,
    ki: KEYBDINPUT_koffi,
    hi: HARDWAREINPUT_koffi,
  }),
} as const;

export enum INPUT_TYPE {
  INPUT_MOUSE = 0,
  INPUT_KEYBOARD = 1,
  INPUT_HARDWARE = 2,
}

export type DUMMYUNIONNAME<T extends INPUT_TYPE> =
  T extends INPUT_TYPE.INPUT_MOUSE
    ? { mi: MOUSEINPUT }
    : T extends INPUT_TYPE.INPUT_KEYBOARD
      ? { ki: KEYBDINPUT }
      : T extends INPUT_TYPE.INPUT_HARDWARE
        ? { hi: HARDWAREINPUT }
        : never;

export type INPUT<T extends INPUT_TYPE> = {
  type: T;
  u: DUMMYUNIONNAME<T>;
};
export const INPUT_koffi = koffi.struct('win_SendInput_INPUT', INPUT);

const siFunc = user32.func('uint SendInput(uint, win_SendInput_INPUT*, int)');

export const MapVirtualKeyA = user32.func(
  'uint MapVirtualKeyA(uint, uint)'
) as (uCode: number, uMapType: number) => number;

/**
 * SendInputを叩く
 * @param cInputs pInputsのlength
 * @param pInputs INPUTのarray
 * @returns
 */
export function sendInput(
  cInputs: number,
  pInputs: INPUT<INPUT_TYPE>[]
): number {
  for (const input of pInputs) {
    console.log(input);
  }
  return siFunc(cInputs, pInputs, koffi.sizeof(INPUT_koffi));
}
