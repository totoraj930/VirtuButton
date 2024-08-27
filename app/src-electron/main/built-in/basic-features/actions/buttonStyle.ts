import { editPageItem, getPageItem } from '@/src-electron/main/Page';
import {
  BooleanField,
  NumberField,
  PluginAction,
} from '@virtu-button/common/Plugin';

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
    const result = structuredClone(button);
    if (values.forceNext) {
      result.viewProps.styleIndex =
        (button.viewProps.styleIndex + 1) % button.styles.length;
    } else {
      const targetIndex = values.index - 1;
      result.viewProps.styleIndex = Math.min(
        button.styles.length - 1,
        targetIndex
      );
    }
    editPageItem(result);
    return result.viewProps.styleIndex;
  },
};
