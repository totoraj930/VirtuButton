import {
  PluginEvent,
  SelectField,
  SelectOption,
} from '@virtu-button/common/Plugin';

type ButtoEventType = 'down' | 'up' | 'click';
const options: SelectOption<ButtoEventType>[] = [
  { key: 'click', name: 'クリックしたとき' },
  { key: 'down', name: '押し込んだとき' },
  { key: 'up', name: '離したとき' },
];

export const buttonEvent: PluginEvent<{
  eventType: SelectField<ButtoEventType>;
}> = {
  id: 'button',
  name: 'ボタン操作イベント',
  description: 'ボタンが操作されたときに実行されます',
  fields: {
    eventType: {
      type: 'select',
      name: '実行タイミング',
      options,
      default: 'click',
    },
  },
};

export const events: PluginEvent<any>[] = [buttonEvent];
