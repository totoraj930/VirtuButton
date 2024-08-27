import { IPCEventParams } from '@/src-common/ipcEvent';
import { MainEventParams } from '@/src-common/mainEvent';

/**
 * Renderer <- 双方向の通信 -> Main
 */
export function ipcSend<K extends keyof IPCEventParams>(
  name: K,
  ...args: IPCEventParams[K]['params']
): Promise<IPCEventParams[K]['result']> {
  console.log(name, ...args);
  return window.ipcRenderer.invoke(name, ...args);
}

/**
 * 横流しするためのあれ
 */
type MainEventHandler<K extends keyof MainEventParams> = (
  event: Electron.IpcRendererEvent,
  ...args: MainEventParams[K]['params']
) => void;
const MainEventHandlers: { [K in keyof MainEventParams]: MainEventHandler<K> } =
  {
    'update:pages': (_, ...args) => {
      __dispatchWindowCustomEvent('update:pages', args);
    },
    'update:settings': (_, ...args) => {
      __dispatchWindowCustomEvent('update:settings', args);
    },
    'update:pageItem': (_, ...args) => {
      __dispatchWindowCustomEvent('update:pageItem', args);
    },
  };

/**
 * Main -> Rendererの全イベントの購読の開始
 * 一番初めに1回だけ呼ぶ
 */
export function addAllMainEventListeners() {
  Object.entries(MainEventHandlers).forEach(([name, handler]) => {
    window.ipcRenderer.on(name, handler);
  });
}

/**
 * Main -> Rendererのイベント
 * 基本使わない
 */
export function __addMainEventListener<K extends keyof MainEventParams>(
  name: K,
  cb: (
    event: Electron.IpcRendererEvent,
    ...args: MainEventParams[K]['params']
  ) => void
) {
  window.ipcRenderer.on(name, cb);
  return () => window.ipcRenderer.off(name, cb);
}

/**
 * MainEventをwindowに横流しする
 * 基本使わない
 */
export function __dispatchWindowCustomEvent<K extends keyof MainEventParams>(
  name: K,
  detail: MainEventParams[K]['params']
) {
  console.log(name);
  const event = new CustomEvent(name, { detail });
  window.dispatchEvent(event);
}

/**
 * windowでMainEventを購読する
 * これを使う
 */
export function addMainEventListener<K extends keyof MainEventParams>(
  name: K,
  cb: (
    event: CustomEvent<MainEventParams[K]['params']>,
    ...args: MainEventParams[K]['params']
  ) => void
) {
  const _cb = (event: CustomEvent<MainEventParams[K]['params']>) => {
    cb(event, ...event.detail);
  };
  window.addEventListener(name, _cb as EventListener);
  return () => window.removeEventListener(name, _cb as EventListener);
}
