import { virtualKeyMap } from '@virtu-button/common/Keyboard/windows';
import {
  COLORS,
  ControlButton,
  KeyCombinationField,
  PluginAction,
  PluginFields,
  PluginFieldValues,
} from '@virtu-button/common/Plugin';
import { sleep } from '../..';
import { KeyAction, sendKeys } from '../sendKey';

type FieldMap = {
  keyList: KeyCombinationField;
};
const fields: PluginFields<FieldMap> = {
  keyList: {
    type: 'keyCombination',
    name: 'キー',
    default: [],
  },
};

async function run(values: PluginFieldValues<FieldMap>) {
  const down: KeyAction[] = values.keyList.flatMap((vk) => {
    const key = virtualKeyMap[vk];
    if (Number.isFinite(key)) {
      return [{ key, direction: 'down' }];
    } else {
      return [];
    }
  });
  const reverse = [...down].reverse();
  const up: KeyAction[] = reverse.map(({ key }) => ({
    key,
    direction: 'up',
  }));
  sendKeys([...down]);
  await sleep(50);
  sendKeys([...up]);
}

const name = 'キーボード入力(組み合わせ)';
const description = 'キーを組み合わせて入力します';

export const winKeyComboAction: PluginAction<FieldMap> = {
  id: 'win-key-combo',
  name,
  description,
  fields,
  run: async (values, payload) => {
    await run(values);
  },
};

export const winKeyComboCB: ControlButton<FieldMap> = {
  id: 'win-key-combo',
  name,
  description,
  fields,
  async onMount(instance) {},
  async onDestroy(instance) {},
  async onClick(instance) {
    await run(instance.fieldValues);
  },
  styles: [
    {
      color: {
        background: COLORS.gray[900],
        text: COLORS.gray[0],
      },
      bgOpacity: 1,
      text: '',
      textSize: 100,
      icon: 'keyboard',
    },
  ],
};
