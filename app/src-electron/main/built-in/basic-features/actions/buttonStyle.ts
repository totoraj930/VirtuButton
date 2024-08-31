import { getPageItem } from '@/src-electron/main/Page';
import {
  BooleanField,
  NumberField,
  PluginAction,
} from '@virtu-button/common/Plugin';
import { pluginInitProps } from '..';

export const buttonStyleAction: PluginAction<{
  index: NumberField;
  forceNext: BooleanField;
}> = {
  id: 'button-style',
  name: 'ボタンスタイル切り替え',
  description: 'ボタンのスタイルを切り替えます',
  fields: {
    index: {
      type: 'number',
      name: 'スタイル番号',
      default: 1,
      min: 1,
      max: 5,
    },
    forceNext: {
      type: 'boolean',
      name: '番号指定を無視して次のスタイルへ進める',
      default: false,
    },
  },
  run: async (values, payload) => {
    if (!payload.from.buttonId) return false;
    const button = getPageItem(payload.from.buttonId);
    if (!button) return false;
    let index = values.index - 1;
    if (values.forceNext) {
      index = button.viewProps.styleIndex + 1;
    }
    pluginInitProps?.updateStyleIndex(button.id, index);
    return true;
  },
};
