import { user32 } from './user32';
import koffi from 'koffi';
import iconv from 'iconv-lite';

/**
 * HWND: long
 * LPARAM: longlong
 */

const GetWindowTextA = user32.func(
  'int GetWindowTextA(long hwnd, string *dest, int lParam)'
) as GetWindowTextA;
type GetWindowTextA = (
  hwnd: number,
  charPointer: Buffer,
  nMaxCount: number
) => number;
const GetWindowTextLengthA = user32.func(
  'int GetWindowTextLengthA(long hwnd)'
) as GetWindowTextLengthA;
type GetWindowTextLengthA = (hwnd: number) => number;

// コールバック関数の定義
// https://learn.microsoft.com/ja-jp/previous-versions/windows/desktop/legacy/ms633498(v=vs.85)
const enumWindowsProc = koffi.proto(
  'bool EnumWindowsProc(long lpEnumFunc, longlong lParam)'
);
type EnumWindowsProc = (hwnd: number, lParam: number) => boolean;

const EnumWindows = user32.func('EnumWindows', 'bool', [
  koffi.pointer(enumWindowsProc),
  'longlong',
]) as EnumWindows;
type EnumWindows = (lpEnumFunc: EnumWindowsProc, lParam: number) => boolean;

export function getAllWindows() {
  const res: {
    title: string;
    hwnd: number;
  }[] = [];
  EnumWindows((hwnd, lParam) => {
    try {
      const length = GetWindowTextLengthA(hwnd);
      if (length === 0) return true;
      const titleBuffer = Buffer.alloc(length);
      const resLength = GetWindowTextA(hwnd, titleBuffer, length + 1);
      const title = iconv.decode(titleBuffer, 'shift-jis');
      if (resLength === 0) return true;
      res.push({ title: title, hwnd });
    } catch {}
    return true;
  }, 0);
  return res;
}
