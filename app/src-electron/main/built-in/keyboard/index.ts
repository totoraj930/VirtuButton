import {
  PluginInitProps,
  VirtuButtonPlugin,
} from '@virtu-button/common/Plugin';
import { winKeyComboAction, winKeyComboCB } from './win/actions/keyCombo';
import {
  winKeyShortcutAction,
  winKeyShortcutCB,
} from './win/actions/keyShortcut';
import { winKeySingleAction } from './win/actions/single';

export let pluginInitProps: PluginInitProps | undefined;

const actions =
  process.platform === 'win32'
    ? [
        // winTestAction,
        winKeySingleAction,
        winKeyComboAction,
        winKeyShortcutAction,
      ]
    : [];
const controlButtons =
  process.platform === 'win32' ? [winKeyComboCB, winKeyShortcutCB] : [];

export const keyboardPlugin: VirtuButtonPlugin = {
  schemaVersion: 1,
  id: 'built-in:keyboard',
  name: 'キーボード入力(built-in)',
  version: '0.0.1',
  description: 'キーボード入力をエミュレートするプラグインです。',
  actions,
  events: [],
  controlButtons,
  init: async (initProps) => {
    pluginInitProps = initProps;
  },
};

export function sleep(duration: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, duration));
}
