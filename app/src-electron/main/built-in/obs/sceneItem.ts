import {
  COLORS,
  ControlButton,
  ControlButtonInstance,
  PluginAction,
  PluginFieldValues,
  SelectField,
  VBPluginError,
} from '@virtu-button/common/Plugin';
import { z } from 'zod';
import { obs, pluginInitProps } from '.';
import { errorToText } from './code';
import { sceneField } from './scene';

export function onSeceneItemVisibleChange(
  sceneId: string,
  itemId: number,
  itemEnabled: boolean
) {
  const itemIdStr = itemId + '';
  itemCBMap.forEach((instance) => {
    const { fieldValues: v } = instance;
    if (v._01_scene === sceneId && v._02_item === itemIdStr) {
      const styleIndex = itemEnabled ? 0 : 1;
      pluginInitProps?.updateStyleIndex(instance.id, styleIndex);
    }
  });
}

type ReqCache = {
  promise: Promise<{
    sceneItems: any[];
  }>;
  time: number;
};
const reqCacheMap: Map<string, ReqCache> = new Map();

export async function getSceneItems(sceneUuid: string) {
  let reqCache = reqCacheMap.get(sceneUuid);
  if (!reqCache || performance.now() - reqCache.time > 1000) {
    const req = obs.call('GetSceneItemList', {
      sceneUuid,
    });
    reqCache = {
      promise: req,
      time: performance.now(),
    };
    reqCacheMap.set(sceneUuid, reqCache);
  }
  const { sceneItems: res } = await reqCache.promise;
  const zSceneItem = z.object({
    sceneItemId: z.number(),
    sceneItemIndex: z.number(),
    sourceName: z.string(),
    sourceUuid: z.string(),
    sceneItemEnabled: z.boolean(),
    sceneItemLocked: z.boolean(),
  });
  const zSceneItemList = z.array(zSceneItem);
  return zSceneItemList
    .parse(res)
    .sort((a, b) => b.sceneItemIndex - a.sceneItemIndex);
}

export async function getSceneItem(sceneUuid: string, itemId: number) {
  return (await getSceneItems(sceneUuid)).find(
    ({ sceneItemId }) => sceneItemId === itemId
  );
}

async function itemField(
  sceneId: string,
  value?: string
): Promise<SelectField> {
  const res: SelectField = {
    type: 'select',
    name: 'アイテム',
    options: [{ key: '0', name: '---' }],
    default: '0',
  };
  try {
    const items = await getSceneItems(sceneId);
    res.options = items.map((item) => {
      return {
        key: item.sceneItemId + '',
        name: item.sourceName,
      };
    });
    res.default = value ?? items[0].sceneItemId + '' ?? '1';
  } catch (e) {
    console.error(e);
    res.disabled = true;
    res.options = [{ key: value ?? 'none', name: '---' }];
    res.default = value ?? 'none';
  }
  return res;
}

type FieldMap = {
  _01_scene: SelectField;
  _02_item: SelectField;
  _03_direction: SelectField<'on' | 'off' | 'toggle'>;
};

async function fields(values?: PluginFieldValues<FieldMap>): Promise<FieldMap> {
  const _01_scene = await sceneField(values?._01_scene);
  const _02_item = await itemField(
    values?._01_scene ?? _01_scene.default,
    values?._02_item
  );
  return {
    _01_scene,
    _02_item,
    _03_direction: {
      type: 'select',
      name: 'オプション',
      options: [
        { key: 'toggle', name: '切り替え' },
        { key: 'on', name: '表示' },
        { key: 'off', name: '非表示' },
      ],
      default: values?._03_direction ?? 'toggle',
    },
  };
}

function getItemEnabled(sceneUuid: string, sceneItemId: number) {
  return obs.call('GetSceneItemEnabled', { sceneUuid, sceneItemId });
}

async function run(values: PluginFieldValues<FieldMap>) {
  try {
    const itemId = Number.parseInt(values._02_item);
    if (!Number.isFinite(itemId)) return;
    let sceneItemEnabled = values._03_direction === 'on' ? true : false;
    if (values._03_direction === 'toggle') {
      sceneItemEnabled = !(await getItemEnabled(values._01_scene, itemId))
        .sceneItemEnabled;
    }
    await obs.call('SetSceneItemEnabled', {
      sceneUuid: values._01_scene,
      sceneItemId: itemId,
      sceneItemEnabled,
    });
  } catch (e) {
    throw new VBPluginError(errorToText(e));
  }
}

const NAME = 'OBSアイテム切り替え';
const DESC = 'OBSのシーンアイテムの表示を切り替えます';

export const itemAction: PluginAction<FieldMap> = {
  id: 'item',
  name: NAME,
  description: DESC,
  fields,
  run,
};

export const itemCBMap: Map<
  string,
  ControlButtonInstance<FieldMap>
> = new Map();

export function reMountAllItemCBs() {
  itemCBMap.forEach((cb) => {
    itemCB.onMount(cb);
  });
}

export function updateAllItemCBs(title: string, styleIndex: number) {
  itemCBMap.forEach((cb) => {
    pluginInitProps?.updateItemViewProps(cb.id, {
      styleIndex,
      temp: { title },
    });
  });
}

export const itemCB: ControlButton<FieldMap> = {
  id: 'item',
  name: NAME,
  description: DESC,
  fields,
  async onMount(instance) {
    console.log('onMount');
    const { id, fieldValues } = instance;
    itemCBMap.set(id, instance);
    const itemId = Number.parseInt(fieldValues._02_item);
    let styleIndex = 1;
    let title = 'アイテムが見つかりません';
    try {
      const item = await getSceneItem(fieldValues._01_scene, itemId);
      styleIndex = item?.sceneItemEnabled ? 0 : 1;
      title = item?.sourceName ?? title;
    } catch (e) {
      console.log(e);
      title = errorToText(e);
    }
    pluginInitProps?.updateItemViewProps(id, { styleIndex, temp: { title } });
  },
  async onDestroy(instance) {
    itemCBMap.delete(instance.id);
  },
  async onClick({ fieldValues: values }) {
    await run(values);
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
      icon: 'visibility',
    },
    {
      bgOpacity: 1,
      textSize: 100,
      color: {
        background: COLORS.gray[900],
        text: COLORS.gray[1000],
      },
      text: '',
      icon: 'visibility_off',
    },
  ],
};
