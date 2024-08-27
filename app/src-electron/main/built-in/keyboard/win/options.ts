import { VirtualKey } from '@virtu-button/common/Keyboard/windows';
import { SelectField, SelectOption } from '@virtu-button/common/Plugin';

export type Direction = 'down' | 'up' | 'down-up';
export const directionOps: SelectOption<Direction>[] = [
  { key: 'down', name: 'ダウン' },
  { key: 'up', name: 'アップ' },
  { key: 'down-up', name: 'ダウン&アップ' },
] as const;

export const virtualKeyOptions: SelectOption<VirtualKey>[] = [
  // マウス(動かなさそう)
  // { type: 'group', name: 'マウス' },
  // { key: 'VK_LBUTTON', name: 'マウス左ボタン' },
  // { key: 'VK_RBUTTON', name: 'マウス右ボタン' },
  // { key: 'VK_MBUTTON', name: 'マウス中央ボタン' },
  // { key: 'VK_XBUTTON1', name: 'マウスサイドボタン1' },
  // { key: 'VK_XBUTTON2', name: 'マウスサイドボタン2' },

  // 普通のキー
  { type: 'group', name: 'キーボード' },
  { key: 'VK_0', name: '0' },
  { key: 'VK_1', name: '1' },
  { key: 'VK_2', name: '2' },
  { key: 'VK_3', name: '3' },
  { key: 'VK_4', name: '4' },
  { key: 'VK_5', name: '5' },
  { key: 'VK_6', name: '6' },
  { key: 'VK_7', name: '7' },
  { key: 'VK_8', name: '8' },
  { key: 'VK_9', name: '9' },
  { key: 'VK_A', name: 'A' },
  { key: 'VK_B', name: 'B' },
  { key: 'VK_C', name: 'C' },
  { key: 'VK_D', name: 'D' },
  { key: 'VK_E', name: 'E' },
  { key: 'VK_F', name: 'F' },
  { key: 'VK_G', name: 'G' },
  { key: 'VK_H', name: 'H' },
  { key: 'VK_I', name: 'I' },
  { key: 'VK_J', name: 'J' },
  { key: 'VK_K', name: 'K' },
  { key: 'VK_L', name: 'L' },
  { key: 'VK_M', name: 'M' },
  { key: 'VK_N', name: 'N' },
  { key: 'VK_O', name: 'O' },
  { key: 'VK_P', name: 'P' },
  { key: 'VK_Q', name: 'Q' },
  { key: 'VK_R', name: 'R' },
  { key: 'VK_S', name: 'S' },
  { key: 'VK_T', name: 'T' },
  { key: 'VK_U', name: 'U' },
  { key: 'VK_V', name: 'V' },
  { key: 'VK_W', name: 'W' },
  { key: 'VK_X', name: 'X' },
  { key: 'VK_Y', name: 'Y' },
  { key: 'VK_Z', name: 'Z' },

  { type: 'group', name: '修飾キー' },
  { key: 'VK_SHIFT', name: 'Shift' },
  { key: 'VK_LSHIFT', name: '左Shift' },
  { key: 'VK_RSHIFT', name: '右Shift' },
  { type: 'hr' },
  { key: 'VK_CONTROL', name: 'Ctrl' },
  { key: 'VK_LCONTROL', name: '左Ctrl' },
  { key: 'VK_RCONTROL', name: '右Ctrl' },
  { type: 'hr' },
  { key: 'VK_MENU', name: 'Alt' },
  { key: 'VK_LMENU', name: '左Alt' },
  { key: 'VK_RMENU', name: '右Alt' },
  { type: 'hr' },
  { key: 'VK_LWIN', name: '左Windows' },
  { key: 'VK_RWIN', name: '右Windows' },

  { type: 'group', name: 'その他' },
  { key: 'VK_BACK', name: 'Backspace' },
  { key: 'VK_TAB', name: 'Tab' },
  { key: 'VK_RETURN', name: 'Enter' },
  { key: 'VK_SPACE', name: 'スペース' },
  { key: 'VK_ESCAPE', name: 'Esc' },
  { type: 'hr' },
  { key: 'VK_CAPITAL', name: 'CapsLock' },
  { key: 'VK_NUMLOCK', name: 'NumLock' },
  { key: 'VK_SNAPSHOT', name: 'PrintScreen' },
  { key: 'VK_SCROLL', name: 'ScrollLock' },
  { key: 'VK_PAUSE', name: 'Pause' },
  { type: 'hr' },
  { key: 'VK_INSERT', name: 'Insert' },
  { key: 'VK_DELETE', name: 'Delete' },
  { key: 'VK_HOME', name: 'Home' },
  { key: 'VK_END', name: 'End' },
  { key: 'VK_PRIOR', name: 'PageUp' },
  { key: 'VK_NEXT', name: 'PageDown' },
  { type: 'hr' },
  { key: 'VK_LEFT', name: '←' },
  { key: 'VK_UP', name: '↑' },
  { key: 'VK_RIGHT', name: '→' },
  { key: 'VK_DOWN', name: '↓' },

  // ファンクションキー
  { type: 'group', name: 'ファンクション' },
  { key: 'VK_F1', name: 'F1' },
  { key: 'VK_F2', name: 'F2' },
  { key: 'VK_F3', name: 'F3' },
  { key: 'VK_F4', name: 'F4' },
  { key: 'VK_F5', name: 'F5' },
  { key: 'VK_F6', name: 'F6' },
  { key: 'VK_F7', name: 'F7' },
  { key: 'VK_F8', name: 'F8' },
  { key: 'VK_F9', name: 'F9' },
  { key: 'VK_F10', name: 'F10' },
  { key: 'VK_F11', name: 'F11' },
  { key: 'VK_F12', name: 'F12' },
  // { type: 'hr' },
  // { key: 'VK_F13', name: 'F13' },
  // { key: 'VK_F14', name: 'F14' },
  // { key: 'VK_F15', name: 'F15' },
  // { key: 'VK_F16', name: 'F16' },
  // { key: 'VK_F17', name: 'F17' },
  // { key: 'VK_F18', name: 'F18' },
  // { key: 'VK_F19', name: 'F19' },
  // { key: 'VK_F20', name: 'F20' },
  // { key: 'VK_F21', name: 'F21' },
  // { key: 'VK_F22', name: 'F22' },
  // { key: 'VK_F23', name: 'F23' },
  // { key: 'VK_F24', name: 'F24' },

  // テンキーとか
  { type: 'group', name: 'テンキー' },
  { key: 'VK_NUMPAD0', name: 'テンキー0' },
  { key: 'VK_NUMPAD1', name: 'テンキー1' },
  { key: 'VK_NUMPAD2', name: 'テンキー2' },
  { key: 'VK_NUMPAD3', name: 'テンキー3' },
  { key: 'VK_NUMPAD4', name: 'テンキー4' },
  { key: 'VK_NUMPAD5', name: 'テンキー5' },
  { key: 'VK_NUMPAD6', name: 'テンキー6' },
  { key: 'VK_NUMPAD7', name: 'テンキー7' },
  { key: 'VK_NUMPAD8', name: 'テンキー8' },
  { key: 'VK_NUMPAD9', name: 'テンキー9' },
  { key: 'VK_MULTIPLY', name: 'テンキー乗算' },
  { key: 'VK_ADD', name: 'テンキー加算' },
  { key: 'VK_SEPARATOR', name: 'テンキー区切り' },
  { key: 'VK_SUBTRACT', name: 'テンキー減算' },
  { key: 'VK_DECIMAL', name: 'テンキー小数点' },
  { key: 'VK_DIVIDE', name: 'テンキー除算' },

  // ブラウザ
  { type: 'group', name: 'ブラウザ' },
  { key: 'VK_BROWSER_BACK', name: 'ブラウザ戻る' },
  { key: 'VK_BROWSER_FORWARD', name: 'ブラウザ進む' },
  { key: 'VK_BROWSER_REFRESH', name: 'ブラウザ更新' },
  { key: 'VK_BROWSER_STOP', name: 'ブラウザ中止' },
  { key: 'VK_BROWSER_SEARCH', name: 'ブラウザ検索' },
  // { key: 'VK_BROWSER_FAVORITES', name: 'ブラウザお気に入り' },
  { key: 'VK_BROWSER_HOME', name: 'ブラウザホーム' },

  // PC操作
  { type: 'group', name: 'PC操作' },
  { key: 'VK_VOLUME_MUTE', name: '音量ミュート' },
  { key: 'VK_VOLUME_DOWN', name: '音量下げ' },
  { key: 'VK_VOLUME_UP', name: '音量上げ' },
  { key: 'VK_MEDIA_NEXT_TRACK', name: '次のメディアトラック' },
  { key: 'VK_MEDIA_PREV_TRACK', name: '前のメディアトラック' },
  { key: 'VK_MEDIA_STOP', name: 'メディア停止' },
  { key: 'VK_MEDIA_PLAY_PAUSE', name: 'メディア再生/一時停止' },
  // { key: 'VK_LAUNCH_MAIL', name: 'メール起動' },
  // { key: 'VK_LAUNCH_MEDIA_SELECT', name: 'メディア選択起動' },
  // { key: 'VK_LAUNCH_APP1', name: 'アプリケーション1起動' },
  // { key: 'VK_LAUNCH_APP2', name: 'アプリケーション2起動' },
  // { key: 'VK_CLEAR', name: 'Clear' },
  // { key: 'VK_SELECT', name: 'Select' },
  // { key: 'VK_PRINT', name: 'Print' },
  // { key: 'VK_EXECUTE', name: 'Execute' },
  // { key: 'VK_HELP', name: 'Help' },
  // { key: 'VK_APPS', name: 'アプリケーション' },
  // { key: 'VK_SLEEP', name: 'コンピュータスリープ' },

  // IME
  // { type: 'group', name: 'IME' },
  // { key: 'VK_KANA', name: 'IME かなモード' },
  // { key: 'VK_JUNJA', name: 'IME Junjaモード' },
  // { key: 'VK_FINAL', name: 'IME ファイナルモード' },
  // { key: 'VK_KANJI', name: 'IME 漢字モード' },
  // { key: 'VK_CONVERT', name: 'IME 変換' },
  // { key: 'VK_NONCONVERT', name: 'IME 無変換' },
  // { key: 'VK_ACCEPT', name: 'IME 使用可能' },
  // { key: 'VK_MODECHANGE', name: 'IME モード変更要求' },
];

// 参考: https://kts.sakaiweb.com/virtualkeycodes.html
export const virtualKeyOptions_all: SelectField<VirtualKey>['options'] = [
  { key: 'VK_LBUTTON', name: 'マウス左ボタン' },
  { key: 'VK_RBUTTON', name: 'マウス右ボタン' },
  { key: 'VK_CANCEL', name: 'コントロールブレイク処理' },
  { key: 'VK_MBUTTON', name: 'マウス中央ボタン' },
  { key: 'VK_XBUTTON1', name: 'マウス第1拡張ボタン' },
  { key: 'VK_XBUTTON2', name: 'マウス第2拡張ボタン' },
  { key: 'VK_BACK', name: 'Backspace' },
  { key: 'VK_TAB', name: 'Tab' },
  { key: 'VK_CLEAR', name: 'Clear' },
  { key: 'VK_RETURN', name: 'Enter' },
  { key: 'VK_SHIFT', name: 'Shift' },
  { key: 'VK_CONTROL', name: 'Ctrl' },
  { key: 'VK_MENU', name: 'Alt' },
  { key: 'VK_PAUSE', name: 'Pause' },
  { key: 'VK_CAPITAL', name: 'CapsLock' },
  { key: 'VK_KANA', name: 'IME かなモード' },
  { key: 'VK_JUNJA', name: 'IME Junjaモード' },
  { key: 'VK_FINAL', name: 'IME ファイナルモード' },
  { key: 'VK_KANJI', name: 'IME 漢字モード' },
  { key: 'VK_ESCAPE', name: 'Esc' },
  { key: 'VK_CONVERT', name: 'IME 変換' },
  { key: 'VK_NONCONVERT', name: 'IME 無変換' },
  { key: 'VK_ACCEPT', name: 'IME 使用可能' },
  { key: 'VK_MODECHANGE', name: 'IME モード変更要求' },
  { key: 'VK_SPACE', name: 'スペース' },
  { key: 'VK_PRIOR', name: 'PageUp' },
  { key: 'VK_NEXT', name: 'PageDown' },
  { key: 'VK_END', name: 'End' },
  { key: 'VK_HOME', name: 'Home' },
  { key: 'VK_LEFT', name: '←' },
  { key: 'VK_UP', name: '↑' },
  { key: 'VK_RIGHT', name: '→' },
  { key: 'VK_DOWN', name: '↓' },
  { key: 'VK_SELECT', name: 'Select' },
  { key: 'VK_PRINT', name: 'Print' },
  { key: 'VK_EXECUTE', name: 'Execute' },
  { key: 'VK_SNAPSHOT', name: 'PrintScreen' },
  { key: 'VK_INSERT', name: 'Insert' },
  { key: 'VK_DELETE', name: 'Delete' },
  { key: 'VK_HELP', name: 'Help' },
  { key: 'VK_0', name: '0' },
  { key: 'VK_1', name: '1' },
  { key: 'VK_2', name: '2' },
  { key: 'VK_3', name: '3' },
  { key: 'VK_4', name: '4' },
  { key: 'VK_5', name: '5' },
  { key: 'VK_6', name: '6' },
  { key: 'VK_7', name: '7' },
  { key: 'VK_8', name: '8' },
  { key: 'VK_9', name: '9' },
  { key: 'VK_A', name: 'A' },
  { key: 'VK_B', name: 'B' },
  { key: 'VK_C', name: 'C' },
  { key: 'VK_D', name: 'D' },
  { key: 'VK_E', name: 'E' },
  { key: 'VK_F', name: 'F' },
  { key: 'VK_G', name: 'G' },
  { key: 'VK_H', name: 'H' },
  { key: 'VK_I', name: 'I' },
  { key: 'VK_J', name: 'J' },
  { key: 'VK_K', name: 'K' },
  { key: 'VK_L', name: 'L' },
  { key: 'VK_M', name: 'M' },
  { key: 'VK_N', name: 'N' },
  { key: 'VK_O', name: 'O' },
  { key: 'VK_P', name: 'P' },
  { key: 'VK_Q', name: 'Q' },
  { key: 'VK_R', name: 'R' },
  { key: 'VK_S', name: 'S' },
  { key: 'VK_T', name: 'T' },
  { key: 'VK_U', name: 'U' },
  { key: 'VK_V', name: 'V' },
  { key: 'VK_W', name: 'W' },
  { key: 'VK_X', name: 'X' },
  { key: 'VK_Y', name: 'Y' },
  { key: 'VK_Z', name: 'Z' },
  { key: 'VK_LWIN', name: '左Windows' },
  { key: 'VK_RWIN', name: '右Windows' },
  { key: 'VK_APPS', name: 'アプリケーション' },
  { key: 'VK_SLEEP', name: 'コンピュータスリープ' },
  { key: 'VK_NUMPAD0', name: 'テンキー0' },
  { key: 'VK_NUMPAD1', name: 'テンキー1' },
  { key: 'VK_NUMPAD2', name: 'テンキー2' },
  { key: 'VK_NUMPAD3', name: 'テンキー3' },
  { key: 'VK_NUMPAD4', name: 'テンキー4' },
  { key: 'VK_NUMPAD5', name: 'テンキー5' },
  { key: 'VK_NUMPAD6', name: 'テンキー6' },
  { key: 'VK_NUMPAD7', name: 'テンキー7' },
  { key: 'VK_NUMPAD8', name: 'テンキー8' },
  { key: 'VK_NUMPAD9', name: 'テンキー9' },
  { key: 'VK_MULTIPLY', name: 'テンキー乗算' },
  { key: 'VK_ADD', name: 'テンキー加算' },
  { key: 'VK_SEPARATOR', name: 'テンキー区切り' },
  { key: 'VK_SUBTRACT', name: 'テンキー減算' },
  { key: 'VK_DECIMAL', name: 'テンキー小数点' },
  { key: 'VK_DIVIDE', name: 'テンキー除算' },
  { key: 'VK_F1', name: 'F1' },
  { key: 'VK_F2', name: 'F2' },
  { key: 'VK_F3', name: 'F3' },
  { key: 'VK_F4', name: 'F4' },
  { key: 'VK_F5', name: 'F5' },
  { key: 'VK_F6', name: 'F6' },
  { key: 'VK_F7', name: 'F7' },
  { key: 'VK_F8', name: 'F8' },
  { key: 'VK_F9', name: 'F9' },
  { key: 'VK_F10', name: 'F10' },
  { key: 'VK_F11', name: 'F11' },
  { key: 'VK_F12', name: 'F12' },
  { key: 'VK_F13', name: 'F13' },
  { key: 'VK_F14', name: 'F14' },
  { key: 'VK_F15', name: 'F15' },
  { key: 'VK_F16', name: 'F16' },
  { key: 'VK_F17', name: 'F17' },
  { key: 'VK_F18', name: 'F18' },
  { key: 'VK_F19', name: 'F19' },
  { key: 'VK_F20', name: 'F20' },
  { key: 'VK_F21', name: 'F21' },
  { key: 'VK_F22', name: 'F22' },
  { key: 'VK_F23', name: 'F23' },
  { key: 'VK_F24', name: 'F24' },
  { key: 'VK_NUMLOCK', name: 'NumLock' },
  { key: 'VK_SCROLL', name: 'ScrollLock' },
  { key: 'VK_LSHIFT', name: '左Shift' },
  { key: 'VK_RSHIFT', name: '右Shift' },
  { key: 'VK_LCONTROL', name: '左Ctrl' },
  { key: 'VK_RCONTROL', name: '右Ctrl' },
  { key: 'VK_LMENU', name: '左Alt' },
  { key: 'VK_RMENU', name: '右Alt' },
  { key: 'VK_BROWSER_BACK', name: 'ブラウザ戻る' },
  { key: 'VK_BROWSER_FORWARD', name: 'ブラウザ進む' },
  { key: 'VK_BROWSER_REFRESH', name: 'ブラウザ更新' },
  { key: 'VK_BROWSER_STOP', name: 'ブラウザ中止' },
  { key: 'VK_BROWSER_SEARCH', name: 'ブラウザ検索' },
  { key: 'VK_BROWSER_FAVORITES', name: 'ブラウザお気に入り' },
  { key: 'VK_BROWSER_HOME', name: 'ブラウザホーム' },
  { key: 'VK_VOLUME_MUTE', name: '音量ミュート' },
  { key: 'VK_VOLUME_DOWN', name: '音量下げ' },
  { key: 'VK_VOLUME_UP', name: '音量上げ' },
  { key: 'VK_MEDIA_NEXT_TRACK', name: '次のメディアトラック' },
  { key: 'VK_MEDIA_PREV_TRACK', name: '前のメディアトラック' },
  { key: 'VK_MEDIA_STOP', name: 'メディア停止' },
  { key: 'VK_MEDIA_PLAY_PAUSE', name: 'メディア再生/一時停止' },
  { key: 'VK_LAUNCH_MAIL', name: 'メール起動' },
  { key: 'VK_LAUNCH_MEDIA_SELECT', name: 'メディア選択起動' },
  { key: 'VK_LAUNCH_APP1', name: 'アプリケーション1起動' },
  { key: 'VK_LAUNCH_APP2', name: 'アプリケーション2起動' },
  { key: 'VK_OEM_1', name: 'OEM1' },
  { key: 'VK_OEM_PLUS', name: '+' },
  { key: 'VK_OEM_COMMA', name: ',' },
  { key: 'VK_OEM_MINUS', name: '-' },
  { key: 'VK_OEM_PERIOD', name: '.' },
  { key: 'VK_OEM_2', name: 'OEM2' },
  { key: 'VK_OEM_3', name: 'OEM3' },
  { key: 'VK_OEM_4', name: 'OEM4' },
  { key: 'VK_OEM_5', name: 'OEM5' },
  { key: 'VK_OEM_6', name: 'OEM6' },
  { key: 'VK_OEM_7', name: 'OEM7' },
  { key: 'VK_OEM_8', name: 'OEM8' },
  { key: 'VK_OEM_102', name: 'OEM102' },
  { key: 'VK_PROCESSKEY', name: 'IME PROCESS' },
  { key: 'VK_ATTN', name: 'Attn' },
  { key: 'VK_CRSEL', name: 'CrSel' },
  { key: 'VK_EXSEL', name: 'ExSel' },
  { key: 'VK_EREOF', name: 'Erase EOF' },
  { key: 'VK_PLAY', name: 'Play' },
  { key: 'VK_ZOOM', name: 'Zoom' },
  { key: 'VK_PA1', name: 'PA1' },
  { key: 'VK_OEM_CLEAR', name: 'Clear' },
] as const;