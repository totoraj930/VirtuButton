import { extendedKeys } from '@virtu-button/common/Keyboard/windows';
import { MapVirtualKeyA } from './SendInput';
import { user32 } from './user32';

export const PostMessageW = user32.func('PostMessageW', 'bool', [
  'long', // hWnd
  'uint', // Msg
  'uintptr_t', // wParam
  'uintptr_t', // lParam
]) as PostMessageW;

type PostMessageW = (
  hwnd: number,
  msg: number,
  wParam: number,
  lParam: number
) => boolean;

export const SendMessageW = user32.func('SendMessageW', 'bool', [
  'long', // hWnd
  'uint', // Msg
  'uintptr_t', // wParam
  'uintptr_t', // lParam
]) as SendMessageW;

type SendMessageW = (
  hwnd: number,
  msg: number,
  wParam: number,
  lParam: number
) => boolean;

export function postKey(
  keyCode: number,
  direction: 'down' | 'up',
  _hwnd?: number
) {
  const HWND_BROADCAST = 0xffff;
  const WM_KEYDOWN = 0x0100;
  const WM_KEYUP = 0x0101;
  const scanCode = MapVirtualKeyA(keyCode, 0);
  const isExtendedKey = extendedKeys.includes(keyCode);

  const hwnd = _hwnd ?? HWND_BROADCAST;

  if (direction === 'up') {
    // https://learn.microsoft.com/ja-jp/windows/win32/inputdev/wm-keyup
    let lParam = 1 & 0xffff; // 16bit(常に1)
    lParam |= (scanCode & 0xff) << 16; // 8bit, 16bit左シフト
    lParam |= (isExtendedKey ? 1 : 0) << 24;
    // 25~28bitはなし
    lParam |= 0 << 29; // コンテキストコード(常に0)
    lParam |= 1 << 30;
    lParam |= 1 << 31;
    console.log('up', lParam);
    return PostMessageW(hwnd, WM_KEYUP, keyCode, lParam);
  } else {
    // https://learn.microsoft.com/ja-jp/windows/win32/inputdev/wm-keydown
    let lParam = 1 & 0xffff; // 16bit(回数)
    lParam |= (scanCode & 0xff) << 16; // 8bit, 16bit左シフト
    lParam |= (isExtendedKey ? 1 : 0) << 24;
    // 25~28bitはなし
    lParam |= 0 << 29; // コンテキストコード(常に0)
    lParam |= 0 << 30; // 前のキーの状態(ダウン1, アップ0)
    lParam |= 0 << 31;
    console.log('down', lParam);
    return PostMessageW(hwnd, WM_KEYDOWN, keyCode, lParam);
  }
}
