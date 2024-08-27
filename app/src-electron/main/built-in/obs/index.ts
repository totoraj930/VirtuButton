import {
  PluginInitProps,
  VirtuButtonPlugin,
} from '@virtu-button/common/Plugin';
import OBSWebScoket from 'obs-websocket-js';
import { ulid } from 'ulid';
import {
  onSceneChange,
  reMountAllSceneCBs,
  sceneAction,
  sceneCB,
  sceneEvent,
  updateAllSceneCBs,
} from './scene';
import {
  itemAction,
  itemCB,
  onSeceneItemVisibleChange,
  reMountAllItemCBs,
  updateAllItemCBs,
} from './sceneItem';

export const obs = new OBSWebScoket();
export let testId = ulid();
export let isActive = false;
obs.on('ConnectionClosed', (error) => {
  isActive = false;
  updateAllItemCBs('Not connected', 1);
  updateAllSceneCBs('Not connected', 1);
  // console.log('ConnectionClosed', error.code, codeToStatusText(error.code));
});
obs.on('ConnectionOpened', async () => {
  console.log('ConnectionOpened');
  isActive = true;
  setTimeout(async () => {
    try {
      const { sceneUuid } = await obs.call('GetCurrentProgramScene');
      onSceneChange(sceneUuid);
      reMountAllSceneCBs();
      reMountAllItemCBs();
    } catch {}
  }, 10);
});
obs.on('ConnectionError', (error) => {
  // console.log('ConnectionError', error, codeToStatusText(error.code));
});

obs.on('CurrentProgramSceneChanged', ({ sceneUuid }) => {
  onSceneChange(sceneUuid);
});

obs.on(
  'SceneItemEnableStateChanged',
  ({ sceneUuid, sceneItemId, sceneItemEnabled }) => {
    onSeceneItemVisibleChange(sceneUuid, sceneItemId, sceneItemEnabled);
  }
);

export let pluginInitProps: PluginInitProps | undefined;

export const obsPlugin: VirtuButtonPlugin = {
  schemaVersion: 1,
  id: 'built-in:obs',
  name: 'OBSプラグイン(built-in)',
  description: 'OBSを操作するプラグインです。',
  actions: [sceneAction, itemAction],
  events: [sceneEvent],
  controlButtons: [sceneCB, itemCB],
  init: async (initProps) => {
    pluginInitProps = initProps;
    try {
      await obs.connect();
      const { sceneUuid } = await obs.call('GetCurrentProgramScene');
      onSceneChange(sceneUuid);
    } catch {}
    setInterval(async () => {
      if (isActive) return;
      try {
        await obs.connect();
      } catch (e) {
        console.error(e);
      }
    }, 5000);
  },
};
