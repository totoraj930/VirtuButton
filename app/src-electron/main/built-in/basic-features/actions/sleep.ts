import { NumberField, PluginAction } from '@virtu-button/common/Plugin';

export const sleepAction: PluginAction<{
  duration: NumberField;
}> = {
  id: 'sleep',
  name: '待機',
  description: '指定された時間だけ処理を待機します',
  fields: {
    duration: {
      type: 'number',
      name: '待機時間(ミリ秒)',
      min: 0,
      max: 1000 * 60,
      step: 100,
      default: 1000,
    },
  },
  run: async (params, payload) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(payload);
        resolve(params.duration);
      }, params.duration);
    });
  },
};

export type SleepAction = typeof sleepAction;
