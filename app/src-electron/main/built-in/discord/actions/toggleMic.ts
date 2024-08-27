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

const NAME = 'DiscordマイクON/OFF';
const DESC = 'DiscordのマイクをON/OFFします';

const micInstances: Map<string, ControlButtonInstance> = new Map();

export function onMicEvent(type: 'mic-on' | 'mic-off') {
  const instances = Array.from(micInstances.values());
  for (const instance of instances) {
    pluginInitProps?.updateStyleIndex(instance.id, type === 'mic-on' ? 0 : 1);
  }
}

export const toggleMicButton: ControlButton<typeof fields> = {
  id: 'toggle-mic',
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
      icon: 'mic',
      textSize: 150,
      bgOpacity: 1,
    },
    {
      color: {
        background: COLORS.gray[900],
        text: COLORS.gray[1000],
      },
      text: 'OFF',
      icon: 'mic_off',
      textSize: 150,
      bgOpacity: 1,
    },
  ],
  onMount: async (instance) => {
    micInstances.set(instance.id, instance);
  },
  onDestroy: async (instance) => {
    micInstances.delete(instance.id);
  },
  onClick: async ({ fieldValues: values }) => {
    if (!api) return;
    return await api.toggleMic(
      values.direction === 'toggle' ? undefined : values.direction
    );
  },
};

export const toggleMicAction: PluginAction<typeof fields> = {
  id: 'toggle-mic',
  name: NAME,
  description: DESC,
  fields,
  run: async (values, payload) => {
    if (!api) return;
    return await api.toggleMic(
      values.direction === 'toggle' ? undefined : values.direction
    );
  },
};
