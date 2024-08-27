import { MainEventParams } from '@/src-common/mainEvent';
import { win } from '..';

export function sendMainEvent<K extends keyof MainEventParams>(
  name: K,
  ...args: MainEventParams[K]['params']
) {
  try {
    if (win) {
      win.webContents.send(name, ...args);
    }
  } catch {
    // todo: winが初期化前の処理
  }
}
