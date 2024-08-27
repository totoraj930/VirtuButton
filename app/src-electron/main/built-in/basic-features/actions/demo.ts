import {
  PluginAction,
  SelectField,
  SelectOption,
  StringField,
} from '@virtu-button/common/Plugin';

export const demoAction: PluginAction<{
  name: StringField;
  test: SelectField;
}> = {
  id: 'demo',
  name: 'デモアクション',
  fields: async (values) => {
    const sleep = (duration: number) =>
      new Promise((resolve) => setTimeout(resolve, duration));
    await sleep(1000);
    const name = values?.name ?? '';
    const options =
      name.split('').map((s): SelectOption<string> => {
        return {
          key: s,
          name: s,
        };
      }) ?? [];
    const d = name.split('')[0] ?? '';
    return {
      name: {
        type: 'string',
        name: 'hoge',
        default: 'fuga',
      },
      test: {
        type: 'select',
        name: 'select',
        options,
        default: d,
      },
    };
  },
  run: async (params) => {
    console.log(params);
  },
};
