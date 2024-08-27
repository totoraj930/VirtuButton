export const virtualKeyMap = {
    VK_LBUTTON: 0x01, // マウスの左ボタン
    VK_RBUTTON: 0x02, // マウスの右ボタン
    VK_CANCEL: 0x03, // 制御中断処理
    VK_MBUTTON: 0x04, // マウスの中央ボタン
    VK_XBUTTON1: 0x05, // X1 マウス ボタン
    VK_XBUTTON2: 0x06, // X2 マウス ボタン
    VK_BACK: 0x08, // Backspace キー
    VK_TAB: 0x09, // Tab キー
    VK_CLEAR: 0x0c, // Clear キー
    VK_RETURN: 0x0d, // Enter キー
    VK_SHIFT: 0x10, // Shift キー
    VK_CONTROL: 0x11, // Ctrl キー
    VK_MENU: 0x12, // ALT キー
    VK_PAUSE: 0x13, // Pause キー
    VK_CAPITAL: 0x14, // CAPS LOCK キー
    VK_KANA: 0x15, // IME かなモード
    VK_HANGUL: 0x15, // IME ハングル モード
    VK_IME_ON: 0x16, // IME オン
    VK_JUNJA: 0x17, // IME Junja モード
    VK_FINAL: 0x18, // IME Final モード
    VK_HANJA: 0x19, // IME Hanja モード
    VK_KANJI: 0x19, // IME 漢字モード
    VK_IME_OFF: 0x1a, // IME オフ
    VK_ESCAPE: 0x1b, // Esc キー
    VK_CONVERT: 0x1c, // IME 変換
    VK_NONCONVERT: 0x1d, // IME 無変換
    VK_ACCEPT: 0x1e, // IME 使用可能
    VK_MODECHANGE: 0x1f, // IME モード変更要求
    VK_SPACE: 0x20, // Space キー
    VK_PRIOR: 0x21, // PageUp キー
    VK_NEXT: 0x22, // PageDown キー
    VK_END: 0x23, // End キー
    VK_HOME: 0x24, // Home キー
    VK_LEFT: 0x25, // 左方向キー
    VK_UP: 0x26, // 上方向キー
    VK_RIGHT: 0x27, // 右方向キー
    VK_DOWN: 0x28, // 下方向キー
    VK_SELECT: 0x29, // Select キー
    VK_PRINT: 0x2a, // Print キー
    VK_EXECUTE: 0x2b, // Execute キー
    VK_SNAPSHOT: 0x2c, // Print Screen キー
    VK_INSERT: 0x2d, // Ins キー
    VK_DELETE: 0x2e, // DEL キー
    VK_HELP: 0x2f, // Help キー
    VK_0: 0x30, // 0 キー
    VK_1: 0x31, // 1 キー
    VK_2: 0x32, // 2 キー
    VK_3: 0x33, // 3 キー
    VK_4: 0x34, // 4 キー
    VK_5: 0x35, // 5 キー
    VK_6: 0x36, // 6 キー
    VK_7: 0x37, // 7 キー
    VK_8: 0x38, // 8 キー
    VK_9: 0x39, // 9 キー
    VK_A: 0x41, // A キー
    VK_B: 0x42, // B キー
    VK_C: 0x43, // C キー
    VK_D: 0x44, // D キー
    VK_E: 0x45, // E キー
    VK_F: 0x46, // F キー
    VK_G: 0x47, // G キー
    VK_H: 0x48, // H キー
    VK_I: 0x49, // I キー
    VK_J: 0x4a, // J キー
    VK_K: 0x4b, // K キー
    VK_L: 0x4c, // L キー
    VK_M: 0x4d, // M キー
    VK_N: 0x4e, // N キー
    VK_O: 0x4f, // O キー
    VK_P: 0x50, // P キー
    VK_Q: 0x51, // Q キー
    VK_R: 0x52, // R キー
    VK_S: 0x53, // S キー
    VK_T: 0x54, // T キー
    VK_U: 0x55, // U キー
    VK_V: 0x56, // V キー
    VK_W: 0x57, // W キー
    VK_X: 0x58, // X キー
    VK_Y: 0x59, // Y キー
    VK_Z: 0x5a, // Z キー
    VK_LWIN: 0x5b, // Windows の左キー
    VK_RWIN: 0x5c, // 右の Windows キー
    VK_APPS: 0x5d, // アプリケーション キー
    VK_SLEEP: 0x5f, // コンピューターのスリープ キー
    VK_NUMPAD0: 0x60, // テンキーの 0 キー
    VK_NUMPAD1: 0x61, // テンキーの 1 キー
    VK_NUMPAD2: 0x62, // テンキーの 2 キー
    VK_NUMPAD3: 0x63, // テンキーの 3 キー
    VK_NUMPAD4: 0x64, // テンキーの 4 キー
    VK_NUMPAD5: 0x65, // テンキーの 5 キー
    VK_NUMPAD6: 0x66, // テンキーの 6 キー
    VK_NUMPAD7: 0x67, // テンキーの 7 キー
    VK_NUMPAD8: 0x68, // テンキーの 8 キー
    VK_NUMPAD9: 0x69, // テンキーの 9 キー
    VK_MULTIPLY: 0x6a, // 乗算キー
    VK_ADD: 0x6b, // キーの追加
    VK_SEPARATOR: 0x6c, // 区切り記号キー
    VK_SUBTRACT: 0x6d, // 減算キー
    VK_DECIMAL: 0x6e, // 10 進キー
    VK_DIVIDE: 0x6f, // 除算キー
    VK_F1: 0x70, // F1 キー
    VK_F2: 0x71, // F2 キー
    VK_F3: 0x72, // F3 キー
    VK_F4: 0x73, // F4 キー
    VK_F5: 0x74, // F5 キー
    VK_F6: 0x75, // F6 キー
    VK_F7: 0x76, // F7 キー
    VK_F8: 0x77, // F8 キー
    VK_F9: 0x78, // F9 キー
    VK_F10: 0x79, // F10 キー
    VK_F11: 0x7a, // F11 キー
    VK_F12: 0x7b, // F12 キー
    VK_F13: 0x7c, // F13 キー
    VK_F14: 0x7d, // F14 キー
    VK_F15: 0x7e, // F15 キー
    VK_F16: 0x7f, // F16 キー
    VK_F17: 0x80, // F17 キー
    VK_F18: 0x81, // F18 キー
    VK_F19: 0x82, // F19 キー
    VK_F20: 0x83, // F20 キー
    VK_F21: 0x84, // F21 キー
    VK_F22: 0x85, // F22 キー
    VK_F23: 0x86, // F23 キー
    VK_F24: 0x87, // F24 キー
    VK_NUMLOCK: 0x90, // NUM LOCK キー
    VK_SCROLL: 0x91, // ScrollLock キー
    VK_LSHIFT: 0xa0, // 左 Shift キー
    VK_RSHIFT: 0xa1, // 右 Shift キー
    VK_LCONTROL: 0xa2, // 左 Ctrl キー
    VK_RCONTROL: 0xa3, // 右 Ctrl キー
    VK_LMENU: 0xa4, // 左 Alt キー
    VK_RMENU: 0xa5, // 右 Alt キー
    VK_BROWSER_BACK: 0xa6, // ブラウザーの戻るキー
    VK_BROWSER_FORWARD: 0xa7, // ブラウザーの進むキー
    VK_BROWSER_REFRESH: 0xa8, // ブラウザーの更新キー
    VK_BROWSER_STOP: 0xa9, // ブラウザーの停止キー
    VK_BROWSER_SEARCH: 0xaa, // ブラウザーの検索キー
    VK_BROWSER_FAVORITES: 0xab, // ブラウザーのお気に入りキー
    VK_BROWSER_HOME: 0xac, // ブラウザーのスタートとホーム キー
    VK_VOLUME_MUTE: 0xad, // 音量ミュート キー
    VK_VOLUME_DOWN: 0xae, // 音量下げるキー
    VK_VOLUME_UP: 0xaf, // 音量上げるキー
    VK_MEDIA_NEXT_TRACK: 0xb0, // 次のトラックキー
    VK_MEDIA_PREV_TRACK: 0xb1, // 前のトラック
    VK_MEDIA_STOP: 0xb2, // メディアの停止キー
    VK_MEDIA_PLAY_PAUSE: 0xb3, // メディアの再生/一時停止キー
    VK_LAUNCH_MAIL: 0xb4, // メール開始キー
    VK_LAUNCH_MEDIA_SELECT: 0xb5, // メディアの選択キー
    VK_LAUNCH_APP1: 0xb6, // アプリケーション 1 の起動キー
    VK_LAUNCH_APP2: 0xb7, // アプリケーション 2 の起動キー
    VK_OEM_1: 0xba, // その他の文字に使用されます。キーボードによって異なる場合があります。米国標準キーボードの場合は、 ;: キー
    VK_OEM_PLUS: 0xbb, // どの国/地域の場合でも + キー
    VK_OEM_COMMA: 0xbc, // どの国/地域の場合でも , キー
    VK_OEM_MINUS: 0xbd, // どの国/地域の場合でも - キー
    VK_OEM_PERIOD: 0xbe, // どの国/地域の場合でも . キー
    VK_OEM_2: 0xbf, // その他の文字に使用されます。キーボードによって異なる場合があります。米国標準キーボードの場合は、 /? キー
    VK_OEM_3: 0xc0, // その他の文字に使用されます。キーボードによって異なる場合があります。米国標準キーボードの場合は、 `~ キー
    VK_OEM_4: 0xdb, // その他の文字に使用されます。キーボードによって異なる場合があります。米国標準キーボードの場合は、 [{ キー
    VK_OEM_5: 0xdc, // その他の文字に使用されます。キーボードによって異なる場合があります。米国標準キーボードの場合は、 \\| キー
    VK_OEM_6: 0xdd, // その他の文字に使用されます。キーボードによって異なる場合があります。米国標準キーボードの場合は、 ]} キー
    VK_OEM_7: 0xde, // その他の文字に使用されます。キーボードによって異なる場合があります。米国標準キーボードの場合は、 '" キー
    VK_OEM_8: 0xdf, // その他の文字に使用されます。キーボードによって異なる場合があります。
    VK_OEM_102: 0xe2, // 標準的な US キーボードの <> キー、US 以外の 102 キー キーボードの \\| キー
    VK_PROCESSKEY: 0xe5, // IME PROCESS キー
    VK_PACKET: 0xe7, // Unicode 文字がキーストロークであるかのように渡されます
    VK_ATTN: 0xf6, // Attn キー
    VK_CRSEL: 0xf7, // CrSel キー
    VK_EXSEL: 0xf8, // ExSel キー
    VK_EREOF: 0xf9, // EOF 消去キー
    VK_PLAY: 0xfa, // 再生キー
    VK_ZOOM: 0xfb, // ズーム キー
    VK_NONAME: 0xfc, // 予約済み
    VK_PA1: 0xfd, // PA1 キー
    VK_OEM_CLEAR: 0xfe, // クリア キー
};
// 拡張キーらしい
// dwFlagsに設定しないとダメっぽい KEYEVENTF_EXTENDEDKEY
export const extendedKeys = [
    virtualKeyMap.VK_UP,
    virtualKeyMap.VK_DOWN,
    virtualKeyMap.VK_LEFT,
    virtualKeyMap.VK_RIGHT,
    virtualKeyMap.VK_HOME,
    virtualKeyMap.VK_END,
    virtualKeyMap.VK_PRIOR,
    virtualKeyMap.VK_NEXT,
    virtualKeyMap.VK_INSERT,
    virtualKeyMap.VK_DELETE,
    virtualKeyMap.VK_NUMLOCK,
    virtualKeyMap.VK_DIVIDE,
    virtualKeyMap.VK_RCONTROL,
    virtualKeyMap.VK_RMENU,
];
export const webKeyCodeToVkMap = {
    Escape: 'VK_ESCAPE',
    Digit1: 'VK_1',
    Digit2: 'VK_2',
    Digit3: 'VK_3',
    Digit4: 'VK_4',
    Digit5: 'VK_5',
    Digit6: 'VK_6',
    Digit7: 'VK_7',
    Digit8: 'VK_8',
    Digit9: 'VK_9',
    Digit0: 'VK_0',
    Minus: 'VK_SUBTRACT',
    Equal: 'VK_ADD',
    Backspace: 'VK_BACK',
    Tab: 'VK_TAB',
    KeyQ: 'VK_Q',
    KeyW: 'VK_W',
    KeyE: 'VK_E',
    KeyR: 'VK_R',
    KeyT: 'VK_T',
    KeyY: 'VK_Y',
    KeyU: 'VK_U',
    KeyI: 'VK_I',
    KeyO: 'VK_O',
    KeyP: 'VK_P',
    BracketLeft: 'VK_OEM_4',
    BracketRight: 'VK_OEM_6',
    Enter: 'VK_RETURN',
    ControlLeft: 'VK_LCONTROL',
    KeyA: 'VK_A',
    KeyS: 'VK_S',
    KeyD: 'VK_D',
    KeyF: 'VK_F',
    KeyG: 'VK_G',
    KeyH: 'VK_H',
    KeyJ: 'VK_J',
    KeyK: 'VK_K',
    KeyL: 'VK_L',
    Semicolon: 'VK_OEM_1',
    Quote: 'VK_OEM_7',
    Backquote: 'VK_OEM_3',
    ShiftLeft: 'VK_LSHIFT',
    Backslash: 'VK_OEM_5',
    KeyZ: 'VK_Z',
    KeyX: 'VK_X',
    KeyC: 'VK_C',
    KeyV: 'VK_V',
    KeyB: 'VK_B',
    KeyN: 'VK_N',
    KeyM: 'VK_M',
    Comma: 'VK_OEM_COMMA',
    Period: 'VK_OEM_PERIOD',
    Slash: 'VK_OEM_2',
    ShiftRight: 'VK_RSHIFT',
    NumpadMultiply: 'VK_MULTIPLY',
    AltLeft: 'VK_LMENU',
    Space: 'VK_SPACE',
    CapsLock: 'VK_CAPITAL',
    F1: 'VK_F1',
    F2: 'VK_F2',
    F3: 'VK_F3',
    F4: 'VK_F4',
    F5: 'VK_F5',
    F6: 'VK_F6',
    F7: 'VK_F7',
    F8: 'VK_F8',
    F9: 'VK_F9',
    F10: 'VK_F10',
    Pause: 'VK_PAUSE',
    ScrollLock: 'VK_SCROLL',
    Numpad7: 'VK_NUMPAD7',
    Numpad8: 'VK_NUMPAD8',
    Numpad9: 'VK_NUMPAD9',
    NumpadSubtract: 'VK_SUBTRACT',
    Numpad4: 'VK_NUMPAD4',
    Numpad5: 'VK_NUMPAD5',
    Numpad6: 'VK_NUMPAD6',
    NumpadAdd: 'VK_ADD',
    Numpad1: 'VK_NUMPAD1',
    Numpad2: 'VK_NUMPAD2',
    Numpad3: 'VK_NUMPAD3',
    Numpad0: 'VK_NUMPAD0',
    NumpadDecimal: 'VK_DECIMAL',
    IntlBackslash: 'VK_OEM_102',
    F11: 'VK_F11',
    F12: 'VK_F12',
    // "NumpadEqual": "VK_OEM_NEC_EQUAL",
    IntlYen: 'VK_OEM_3',
    NumpadComma: 'VK_OEM_PLUS',
    // "Undo": "VK_UNDO",
    // "Paste": "VK_PASTE",
    MediaTrackPrevious: 'VK_MEDIA_PREV_TRACK',
    // "Cut": "VK_CUT",
    // "Copy": "VK_COPY",
    MediaTrackNext: 'VK_MEDIA_NEXT_TRACK',
    NumpadEnter: 'VK_RETURN',
    ControlRight: 'VK_RCONTROL',
    AudioVolumeMute: 'VK_VOLUME_MUTE',
    LaunchApp2: 'VK_LAUNCH_APP2',
    MediaPlayPause: 'VK_MEDIA_PLAY_PAUSE',
    MediaStop: 'VK_MEDIA_STOP',
    AudioVolumeDown: 'VK_VOLUME_DOWN',
    AudioVolumeUp: 'VK_VOLUME_UP',
    BrowserHome: 'VK_BROWSER_HOME',
    NumpadDivide: 'VK_DIVIDE',
    PrintScreen: 'VK_SNAPSHOT',
    AltRight: 'VK_RMENU',
    Help: 'VK_HELP',
    NumLock: 'VK_NUMLOCK',
    Home: 'VK_HOME',
    ArrowUp: 'VK_UP',
    PageUp: 'VK_PRIOR',
    ArrowLeft: 'VK_LEFT',
    ArrowRight: 'VK_RIGHT',
    End: 'VK_END',
    ArrowDown: 'VK_DOWN',
    PageDown: 'VK_NEXT',
    Insert: 'VK_INSERT',
    Delete: 'VK_DELETE',
    MetaLeft: 'VK_LWIN',
    MetaRight: 'VK_RWIN',
    ContextMenu: 'VK_APPS',
    // "Power": "VK_POWER",
    Sleep: 'VK_SLEEP',
    // "WakeUp": "VK_WAKE",
    BrowserSearch: 'VK_BROWSER_SEARCH',
    BrowserFavorites: 'VK_BROWSER_FAVORITES',
    BrowserRefresh: 'VK_BROWSER_REFRESH',
    BrowserStop: 'VK_BROWSER_STOP',
    BrowserForward: 'VK_BROWSER_FORWARD',
    BrowserBack: 'VK_BROWSER_BACK',
    LaunchApp1: 'VK_LAUNCH_APP1',
    LaunchMail: 'VK_LAUNCH_MAIL',
    MediaSelect: 'VK_LAUNCH_MEDIA_SELECT',
};
