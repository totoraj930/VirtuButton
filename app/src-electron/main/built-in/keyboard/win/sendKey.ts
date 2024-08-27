import { extendedKeys } from '@virtu-button/common/Keyboard/windows';
import {
  dwFlags,
  INPUT,
  INPUT_TYPE,
  MapVirtualKeyA,
  sendInput,
} from './lib/SendInput';

export type KeyAction = {
  key: number;
  direction: 'down' | 'up' | 'down-up';
};

/**
 * win32apiを使ってキーアクションをエミュレートする
 * @param keyActions 同時に送るキーアクションの配列
 * @returns
 */
export function sendKeys(keyActions: KeyAction[]) {
  const inputs = keyActions.flatMap(({ key, direction }) => {
    switch (direction) {
      case 'down': {
        return [makeKeyInput(key)];
      }
      case 'up': {
        return [makeKeyInput(key, true)];
      }
      case 'down-up': {
        return [makeKeyInput(key), makeKeyInput(key, true, 10)];
      }
    }
  });
  return sendInput(inputs.length, inputs);
}

/**
 * INPUTを作る
 */
function makeKeyInput(
  key: number,
  isKeyUp?: boolean,
  time?: number,
  isUseScanCode?: boolean
): INPUT<INPUT_TYPE.INPUT_KEYBOARD> {
  const scanCode = MapVirtualKeyA(key, 0);
  let flags = isUseScanCode ? dwFlags.KEYEVENTF_SCANCODE : 0;
  if (isKeyUp) flags |= dwFlags.KEYEVENTF_KEYUP;
  if (extendedKeys.includes(key)) flags |= dwFlags.KEYEVENTF_EXTENDEDKEY;

  return {
    type: INPUT_TYPE.INPUT_KEYBOARD,
    u: {
      ki: {
        wVk: isUseScanCode ? 0 : key,
        wScan: scanCode,
        dwFlags: flags,
        time: time ?? 0,
        dwExtraInfo: 0,
      },
    },
  };
}
