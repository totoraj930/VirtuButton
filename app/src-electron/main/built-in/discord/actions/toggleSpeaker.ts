import {
  COLORS,
  ControlButton,
  ControlButtonInstance,
  PluginAction,
  PluginFields,
  SelectField,
  SelectOption,
} from '@virtu-button/common/Plugin';
import { api, pluginInitProps } from '..';

type ToggleDirection = 'on' | 'off' | 'toggle';
const toggleOptions: SelectOption<ToggleDirection>[] = [
  {
    key: 'on',
    name: 'ON',
  },
  {
    key: 'off',
    name: 'OFF',
  },
  {
    key: 'toggle',
    name: '切り替え',
  },
];

const fields: PluginFields<{ direction: SelectField<ToggleDirection> }> = {
  direction: {
    type: 'select',
    name: 'ON/OFF/切り替え',
    default: 'toggle',
    options: toggleOptions,
  },
};

const NAME = 'DiscordスピーカーON/OFF';
const DESC = 'DiscordのスピーカーをON/OFFします';

const speakerInstances: Map<string, ControlButtonInstance> = new Map();

export function onSpeakerEvent(type: 'speaker-on' | 'speaker-off') {
  const instances = Array.from(speakerInstances.values());
  for (const instance of instances) {
    pluginInitProps?.updateStyleIndex(
      instance.id,
      type === 'speaker-on' ? 0 : 1
    );
  }
}

export const toggleSpeakerButton: ControlButton<typeof fields> = {
  id: 'toggle-speaker',
  name: NAME,
  description: DESC,
  fields,
  styles: [
    {
      color: {
        background: COLORS.gray[900],
        text: COLORS.cyan[400],
      },
      text: 'ON',
      icon: 'volume_up',
      textSize: 150,
      bgOpacity: 1,
    },
    {
      color: {
        background: COLORS.gray[900],
        text: COLORS.gray[1000],
      },
      text: 'OFF',
      icon: 'volume_off',
      textSize: 150,
      bgOpacity: 1,
    },
  ],
  onMount: async (instance) => {
    speakerInstances.set(instance.id, instance);
  },
  onDestroy: async (instance) => {
    speakerInstances.delete(instance.id);
  },
  onClick: async ({ fieldValues: values }) => {
    if (!api) return;
    return await api.toggleSpeaker(
      values.direction === 'toggle' ? undefined : values.direction
    );
  },
};

export const toggleSpeakerAction: PluginAction<typeof fields> = {
  id: 'toggle-speaker',
  name: NAME,
  description: DESC,
  fields,
  run: async (values, payload) => {
    if (!api) return;
    return await api.toggleSpeaker(
      values.direction === 'toggle' ? undefined : values.direction
    );
  },
};
