import type {
  PluginInitProps,
  VirtuButtonPlugin,
} from '@virtu-button/common/Plugin';
import { buttonStyleAction } from './actions/buttonStyle';
import { openAction, openCB } from './actions/oepn';
import { pageAction, pageCB } from './actions/page';
import { sleepAction } from './actions/sleep';
import { events } from './events';

export let pluginInitProps: PluginInitProps | undefined;

export const basicFeaturesPlugin: VirtuButtonPlugin = {
  schemaVersion: 1,
  id: 'built-in:basic',
  version: '0.0.1',
  name: '基本機能(built-in)',
  description: `基本的な機能を提供するプラグインです。`,
  actions: [sleepAction, openAction, buttonStyleAction, pageAction],
  events,
  controlButtons: [openCB, pageCB],
  init: async (initProps) => {
    pluginInitProps = initProps;
  },
} as const;
