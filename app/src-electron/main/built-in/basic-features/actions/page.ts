import { virtuButtonPages } from '@/src-electron/main/Page';
import { editSettings, settings } from '@/src-electron/main/settings';
import {
  COLORS,
  ControlButton,
  NumberField,
  PluginAction,
  PluginFields,
  PluginFieldValues,
  SelectField,
  SelectOption,
} from '@virtu-button/common/Plugin';
import { pluginInitProps } from '..';

type Direction = 'prev' | 'next' | 'index';
const options: SelectOption<Direction>[] = [
  {
    key: 'prev',
    name: '前のページ',
  },
  {
    key: 'next',
    name: '次のページ',
  },
  {
    key: 'index',
    name: '指定したページ',
  },
];

type FieldMap = {
  _01_direction: SelectField<Direction>;
  _02_index: NumberField;
};
const fields: PluginFields<FieldMap> = (values) => {
  const disabled = values?._01_direction !== 'index';
  return {
    _01_direction: {
      type: 'select',
      name: '移動先',
      default: values?._01_direction ?? 'next',
      options,
    },
    _02_index: {
      type: 'number',
      name: 'ページ番号指定',
      default: values?._02_index ?? 1,
      min: 1,
      max: 20,
      disabled,
    },
  };
};

async function run(values: PluginFieldValues<FieldMap>) {
  let newIndex = settings.pageIndex;
  const pageLength = virtuButtonPages.length;
  switch (values._01_direction) {
    case 'index': {
      newIndex = (values._02_index - 1) % pageLength;
      break;
    }
    case 'next': {
      newIndex = (newIndex + 1) % pageLength;
      break;
    }
    case 'prev': {
      newIndex = (newIndex - 1 + pageLength) % pageLength;
      break;
    }
  }
  if (newIndex !== settings.pageIndex) {
    editSettings({ pageIndex: newIndex });
  }
  return newIndex;
}

const name = 'ページ切り替え';
const description = '指定されたページに切り替えます';

export const pageAction: PluginAction<FieldMap> = {
  id: 'page-change',
  name,
  description,
  fields,
  run: async (values, payload) => {
    return await run(values);
  },
};

export const pageCB: ControlButton<FieldMap> = {
  id: 'page-change',
  name,
  description,
  fields,
  async onMount(instance) {
    const values = instance.fieldValues;
    let title = 'ページ: ' + values._02_index;
    title = values._01_direction === 'next' ? '次のページ' : title;
    title = values._01_direction === 'prev' ? '前のページ' : title;
    pluginInitProps?.updateItemViewProps(instance.id, {
      temp: { title },
    });
  },
  async onDestroy() {},
  async onClick(instance) {
    await run(instance.fieldValues);
  },
  styles: [
    {
      color: {
        background: COLORS.gray[900],
        text: COLORS.gray[0],
      },
      text: '',
      icon: '',
      bgOpacity: 1,
      textSize: 150,
    },
  ],
};
