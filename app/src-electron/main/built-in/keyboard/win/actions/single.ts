import {
  VirtualKey,
  virtualKeyMap,
} from '@virtu-button/common/Keyboard/windows';
import { PluginAction, SelectField } from '@virtu-button/common/Plugin';
import { Direction, directionOps, virtualKeyOptions } from '../options';
import { sendKeys } from '../sendKey';

export const winKeySingleAction: PluginAction<{
  _1_key: SelectField<VirtualKey>;
  _2_direction: SelectField<Direction>;
}> = {
  id: 'win-key-single',
  name: 'キーボード入力(個別)',
  description: '指定されたキーを入力します(Windows用)',
  fields: {
    _1_key: {
      type: 'select',
      name: 'キー',
      options: virtualKeyOptions,
      default: 'VK_0',
    },
    _2_direction: {
      type: 'select',
      name: 'アクション',
      options: directionOps,
      default: 'down-up',
    },
  },
  run: async (values, payload) => {
    const key = virtualKeyMap[values._1_key];
    if (Number.isFinite(key)) {
      return sendKeys([
        {
          key,
          direction: values._2_direction,
        },
      ]);
    }
  },
};
