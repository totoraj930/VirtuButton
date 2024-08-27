import {
  BooleanField,
  COLORS,
  ControlButton,
  ControlButtonInstance,
  PluginAction,
  PluginEvent,
  PluginFieldValues,
  SelectField,
  SelectOption,
  VBPluginError,
} from '@virtu-button/common/Plugin';
import { z } from 'zod';
import { obs, pluginInitProps } from '.';
import { errorToText } from './code';

type Scene = {
  sceneIndex: number;
  sceneName: string;
  sceneUuid: string;
};

type ReqCache = {
  promise: ReturnType<typeof obs.call<'GetSceneList'>>;
  time: number;
};
let reqCache: ReqCache | undefined;

export async function getScenes() {
  let cache = reqCache;
  if (!cache || performance.now() - cache.time > 1000) {
    const req = obs.call('GetSceneList');
    cache = {
      promise: req,
      time: performance.now(),
    };
    reqCache = cache;
  }
  const res = await cache.promise;
  const zScene = z.object({
    sceneIndex: z.number(),
    sceneName: z.string(),
    sceneUuid: z.string(),
  });
  const zScenes = z.array(zScene);
  return zScenes.parse(res.scenes).sort((a, b) => b.sceneIndex - a.sceneIndex);
}

export async function getScene(id: string) {
  const scenes = await getScenes();
  return scenes.find((scene) => scene.sceneUuid === id);
}

export async function setScene(sceneUuid: string, isPreview?: boolean) {
  try {
    if (isPreview) {
      await obs.call('SetCurrentPreviewScene', { sceneUuid });
    } else {
      await obs.call('SetCurrentProgramScene', { sceneUuid });
    }
  } catch (e) {
    throw new VBPluginError(errorToText(e));
  }
}
let currentSceneUuid = '';
export function onSceneChange(sceneUuid: string) {
  currentSceneUuid = sceneUuid;
  for (const [itemId, { fieldValues }] of sceneCBMap.entries()) {
    const styleIndex = fieldValues._01_scene === sceneUuid ? 0 : 1;
    pluginInitProps?.updateItemViewProps(itemId, {
      styleIndex,
    });
  }
  // 表示されたsceneのイベントを発火
  pluginInitProps?.emitPluginEvent<EventFieldMap>({
    eventId: 'scene',
    fieldValues: { _01_scene: sceneUuid, _02_direction: 'on' },
  });
  // それ以外のsceneの非表示イベントを発火
  pluginInitProps?.emitPluginEvent<EventFieldMap>({
    eventId: 'scene',
    fieldValues: { _02_direction: 'off' },
    excludeValues: { _01_scene: sceneUuid },
  });
}

type FieldMap = {
  _01_scene: SelectField;
  _02_isPreview: BooleanField;
};

export async function sceneField(value?: string): Promise<SelectField> {
  try {
    const scenes = await getScenes();
    const options: SelectOption<string>[] = scenes.map((scene) => {
      return {
        key: scene.sceneUuid,
        name: scene.sceneName,
      };
    });
    return {
      type: 'select',
      name: 'シーン',
      options,
      default: value ?? scenes[0]?.sceneUuid ?? '',
    };
  } catch {
    return {
      type: 'select',
      name: 'シーン',
      options: [{ key: value ?? 'none', name: 'OBSに接続できませんでした' }],
      default: value ?? 'none',
      disabled: true,
    };
  }
}

async function fields(values?: PluginFieldValues<FieldMap>): Promise<FieldMap> {
  return {
    _01_scene: await sceneField(values?._01_scene),
    _02_isPreview: {
      type: 'boolean',
      name: 'プレビュー(スタジオモード限定)',
      default: values?._02_isPreview ?? false,
    },
  };
}

export const sceneAction: PluginAction<FieldMap> = {
  id: 'scene',
  name: 'OBSシーン切り替え',
  description: 'OBSのシーンを切り替えます',
  fields,
  run: async (values) => {
    await setScene(values._01_scene, values._02_isPreview);
  },
};

export const sceneCBMap: Map<
  string,
  ControlButtonInstance<FieldMap>
> = new Map();

export function reMountAllSceneCBs() {
  sceneCBMap.forEach((cb) => {
    sceneCB.onMount(cb);
  });
}

export function updateAllSceneCBs(title: string, styleIndex: number) {
  sceneCBMap.forEach((cb) => {
    pluginInitProps?.updateItemViewProps(cb.id, {
      styleIndex,
      temp: { title },
    });
  });
}

export const sceneCB: ControlButton<FieldMap> = {
  id: 'scene',
  name: 'OBSシーン切り替え',
  description: 'OBSのシーンを切り替えます',
  fields,
  async onMount(instance) {
    const { id, fieldValues } = instance;
    sceneCBMap.set(id, instance);
    const styleIndex = fieldValues._01_scene === currentSceneUuid ? 0 : 1;
    let title = 'シーンが見つかりません';
    try {
      const scene = await getScene(fieldValues._01_scene);
      title = scene?.sceneName ?? title;
    } catch (e) {
      console.log(e);
      title = errorToText(e);
    }
    pluginInitProps?.updateItemViewProps(id, { styleIndex, temp: { title } });
    console.log('onMount', title, styleIndex, currentSceneUuid === '');
  },
  async onDestroy({ id }) {
    sceneCBMap.delete(id);
    console.log('onDestroy');
  },
  async onClick({ fieldValues: values }) {
    await setScene(values._01_scene, values._02_isPreview);
  },
  styles: [
    {
      bgOpacity: 1,
      textSize: 100,
      color: {
        background: COLORS.gray[900],
        text: COLORS.cyan[400],
      },
      text: '',
      icon: 'reset_tv',
    },
    {
      bgOpacity: 1,
      textSize: 100,
      color: {
        background: COLORS.gray[900],
        text: COLORS.gray[1000],
      },
      text: '',
      icon: 'reset_tv',
    },
  ],
};

type EventFieldMap = {
  _01_scene: SelectField;
  _02_direction: SelectField<'on' | 'off'>;
};
export const sceneEvent: PluginEvent<EventFieldMap> = {
  id: 'scene',
  name: 'OBSシーン切り替え',
  description: 'OBSのシーンが変わったときに実行されます',
  fields: async (values) => {
    return {
      _01_scene: await sceneField(values?._01_scene),
      _02_direction: {
        type: 'select',
        name: '実行タイミング',
        options: [
          { key: 'on', name: '表示' },
          { key: 'off', name: '非表示' },
        ],
        default: values?._02_direction ?? 'on',
      },
    };
  },
};
