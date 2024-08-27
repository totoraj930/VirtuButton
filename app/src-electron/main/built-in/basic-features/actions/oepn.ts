import {
  COLORS,
  ControlButton,
  PluginAction,
  StringField,
  VBPluginError,
} from '@virtu-button/common/Plugin';
import { shell } from 'electron';

const NAME = '開く';
const DESC = '指定されたファイル、フォルダ、URLを開きます';

const fields: { dir: StringField } = {
  dir: {
    type: 'string',
    name: 'ファイル or フォルダ or URL',
    default: '',
    placeholder: '入力してください',
  },
};

async function openDir(dir: string) {
  if (dir.length === 0) {
    throw new VBPluginError(
      'ファイル、フォルダ、URLのいずれかのパスを指定してください'
    );
  }
  await shell.openExternal(dir);
  return dir;
}

export const openAction: PluginAction<typeof fields> = {
  id: 'open',
  name: NAME,
  description: DESC,
  fields,
  run: async (values, payload) => {
    return await openDir(values.dir);
  },
};

export const openCB: ControlButton<typeof fields> = {
  id: 'open',
  name: NAME,
  description: DESC,
  fields,
  styles: [
    {
      color: {
        background: COLORS.gray[900],
        text: COLORS.gray[0],
      },
      text: '開く',
      icon: 'open_in_browser',
      bgOpacity: 1,
      textSize: 150,
    },
  ],
  onMount: async (instance) => {},
  onDestroy: async (instance) => {},
  onClick: async (instance) => {
    return await openDir(instance.fieldValues.dir);
  },
  onDown: async (instance) => {},
  onUp: async (instance) => {},
};
