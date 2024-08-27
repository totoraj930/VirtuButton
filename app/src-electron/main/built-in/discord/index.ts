import {
  PluginInitProps,
  VirtuButtonPlugin,
} from '@virtu-button/common/Plugin';
import fs from 'node:fs';
import path from 'node:path';
import { getUsingPluginIds } from '../../Page';
import {
  onMicEvent,
  toggleMicAction,
  toggleMicButton,
} from './actions/toggleMic';
import {
  onSpeakerEvent,
  toggleSpeakerAction,
  toggleSpeakerButton,
} from './actions/toggleSpeaker';
import { DiscordApi } from './api';
import { emitEvent, events } from './events';
import { DiscordTokenRes } from './schema';

export let pluginInitProps: PluginInitProps | undefined;

export let tokenRes: DiscordTokenRes | undefined;

export let api: DiscordApi | null = null;

export function onEvent(
  event: 'mic-on' | 'mic-off' | 'speaker-on' | 'speaker-off'
) {
  emitEvent(event);
  if (event === 'mic-on' || event === 'mic-off') {
    onMicEvent(event);
  } else if (event === 'speaker-on' || event == 'speaker-off') {
    onSpeakerEvent(event);
  }
}

export const discordPlugin: VirtuButtonPlugin = {
  schemaVersion: 1,
  id: 'built-in:discord',
  name: 'Discordプラグイン(built-in)',
  description: `Discordの操作を行うプラグインです。`,
  actions: [toggleMicAction, toggleSpeakerAction],
  events,
  controlButtons: [toggleMicButton, toggleSpeakerButton],
  init: async (initProps) => {
    pluginInitProps = initProps;

    const dir = path.join(initProps.pluginPath, './discrod');
    const file = path.join(dir, './discord.json');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {
        recursive: true,
      });
    }

    api = new DiscordApi(file);

    // 使われているPluginのID一覧
    const usingPluginIds = getUsingPluginIds();
    if (usingPluginIds.includes('built-in:discord')) {
      try {
        await api.login();
      } catch (e) {
        console.error(e);
      }
    }
  },
};
