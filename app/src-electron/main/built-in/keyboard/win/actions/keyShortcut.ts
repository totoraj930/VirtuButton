import {
  VirtualKey,
  virtualKeyMap,
} from '@virtu-button/common/Keyboard/windows';
import {
  BooleanField,
  COLORS,
  ControlButton,
  PluginAction,
  PluginFields,
  PluginFieldValues,
  SelectField,
} from '@virtu-button/common/Plugin';
import { sleep } from '../..';
import { virtualKeyOptions } from '../options';
import { KeyAction, sendKeys } from '../sendKey';

const name = 'キーボード入力(ショートカット)';
const description = '指定されたキーと修飾キーを入力します';

type FieldMap = {
  _01_key: SelectField<VirtualKey>;
  _10_shift: BooleanField;
  _10_shiftL: BooleanField;
  _10_shiftR: BooleanField;
  _20_ctrl: BooleanField;
  _20_ctrlL: BooleanField;
  _20_ctrlR: BooleanField;
  _30_alt: BooleanField;
  _30_altL: BooleanField;
  _30_altR: BooleanField;
  _40_winL: BooleanField;
  _40_winR: BooleanField;
};

const fields: PluginFields<FieldMap> = {
  _01_key: {
    type: 'select',
    options: virtualKeyOptions,
    default: 'VK_0',
    name: 'キー',
  },
  _10_shift: {
    type: 'boolean',
    name: 'Shift',
    default: false,
  },
  _10_shiftL: {
    type: 'boolean',
    name: '左Shift',
    default: false,
  },
  _10_shiftR: {
    type: 'boolean',
    name: '右Shift',
    default: false,
  },
  _20_ctrl: {
    type: 'boolean',
    name: 'Ctrl',
    default: false,
  },
  _20_ctrlL: {
    type: 'boolean',
    name: '左Ctrl',
    default: false,
  },
  _20_ctrlR: {
    type: 'boolean',
    name: '右Ctrl',
    default: false,
  },
  _30_alt: {
    type: 'boolean',
    name: 'Alt',
    default: false,
  },
  _30_altL: {
    type: 'boolean',
    name: '左Alt',
    default: false,
  },
  _30_altR: {
    type: 'boolean',
    name: '右Alt',
    default: false,
  },
  _40_winL: {
    type: 'boolean',
    name: '左Windows',
    default: false,
  },
  _40_winR: {
    type: 'boolean',
    name: '右Windows',
    default: false,
  },
};

async function run(values: PluginFieldValues<FieldMap>) {
  const mainKey = virtualKeyMap[values._01_key];
  if (!Number.isFinite(mainKey)) return;
  const modifers = Object.entries(values).flatMap(
    ([key, value]): [VirtualKey] | [] => {
      const k = key as keyof typeof values;
      switch (k) {
        case '_10_shift': {
          return value ? ['VK_SHIFT'] : [];
        }
        case '_10_shiftL': {
          return value ? ['VK_LSHIFT'] : [];
        }
        case '_10_shiftR': {
          return value ? ['VK_RSHIFT'] : [];
        }

        case '_20_ctrl': {
          return value ? ['VK_CONTROL'] : [];
        }
        case '_20_ctrlL': {
          return value ? ['VK_LCONTROL'] : [];
        }
        case '_20_ctrlR': {
          return value ? ['VK_RCONTROL'] : [];
        }

        case '_30_alt': {
          return value ? ['VK_MENU'] : [];
        }
        case '_30_altL': {
          return value ? ['VK_LMENU'] : [];
        }
        case '_30_altR': {
          return value ? ['VK_RMENU'] : [];
        }

        case '_40_winL': {
          return value ? ['VK_LWIN'] : [];
        }
        case '_40_winR': {
          return value ? ['VK_RWIN'] : [];
        }
      }
      return [];
    }
  );

  const modifersDown: KeyAction[] = modifers.flatMap((vk) => {
    const key = virtualKeyMap[vk];
    if (Number.isFinite(key)) {
      return [{ key, direction: 'down' }];
    } else {
      return [];
    }
  });
  const modifersUp: KeyAction[] = [...modifersDown]
    .reverse()
    .map(({ key }) => ({
      key,
      direction: 'up',
    }));

  sendKeys([...modifersDown, { key: mainKey, direction: 'down' }]);
  await sleep(50);
  sendKeys([{ key: mainKey, direction: 'up' }, ...modifersUp]);
}

export const winKeyShortcutAction: PluginAction<FieldMap> = {
  id: 'win-key-shortcut',
  name,
  description,
  fields,
  async run(values) {
    await run(values);
  },
};

export const winKeyShortcutCB: ControlButton<FieldMap> = {
  id: 'win-key-shortcut',
  name,
  description,
  fields,
  async onMount() {},
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
      bgOpacity: 1,
      text: '',
      textSize: 100,
      icon: 'keyboard',
    },
  ],
};
