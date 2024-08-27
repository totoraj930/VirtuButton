import {
  PluginEvent,
  SelectField,
  SelectOption,
} from '@virtu-button/common/Plugin';
import { pluginInitProps } from '.';

type EventType = 'mic-on' | 'mic-off' | 'speaker-on' | 'speaker-off';
const options: SelectOption<EventType>[] = [
  {
    key: 'mic-on',
    name: 'マイクON',
  },
  {
    key: 'mic-off',
    name: 'マイクOFF',
  },
  {
    key: 'speaker-on',
    name: 'スピーカーON',
  },
  {
    key: 'speaker-off',
    name: 'スピーカーOFF',
  },
];
const mainEvent: PluginEvent<{ eventType: SelectField<EventType> }> = {
  id: 'discord',
  name: 'Discordイベント',
  description: 'Discordのイベントです',
  fields: {
    eventType: {
      type: 'select',
      name: 'イベントタイプ',
      options,
      default: 'mic-on',
    },
  },
};

export const events: PluginEvent<any>[] = [mainEvent];

export function emitEvent(eventType: EventType) {
  if (!pluginInitProps) return;
  pluginInitProps.emitPluginEvent({
    eventId: mainEvent.id,
    fieldValues: {
      eventType,
    },
  });
}
