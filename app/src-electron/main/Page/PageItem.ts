import {
  ButtonViewProps,
  PageItem,
  PageItemAdapted,
  PageItemSerialized,
} from '@virtu-button/common/Plugin';
import { produce } from 'immer';
import {
  adaptCBInstance,
  destroyCBInstance,
  mountCBInstance,
  setVirtuButtonPages,
  updatePageSettings,
  virtuButtonPages,
} from '.';
import { sendMainEvent } from '../ipcEvent/mainEvent';
import { wsEmitButton, wsEmitCurrentPage } from '../Server/ws';

/**
 * 全Pageに存在するPageItemを全て返す
 */
export function getPageItemAll() {
  const items = virtuButtonPages.map((page) => page.items).flat();
  return items;
}

export function getPageItemsFromType<
  T extends PageItem['type'],
  R = Extract<PageItem, { type: T }>[],
>(type: T): R {
  return virtuButtonPages
    .map((page) => page.items.filter((item) => item.type === type))
    .flat() as R;
}

export function getPageItem(itemId: string): PageItemSerialized | null {
  for (const page of virtuButtonPages) {
    const item = page.items.find((v) => v.id === itemId);
    if (item) return item;
  }
  return null;
}

/**
 * PageItemを追加する
 * Pluginとの接続も同時に行われる
 */
export function addPageItem(pageId: string, item: PageItem, mount = true) {
  const newItem = adaptPageItem(item);
  setVirtuButtonPages(
    produce((pages) => {
      for (const page of pages) {
        if (page.id === pageId) {
          page.items.push(newItem);
          break;
        }
      }
    })
  );
  if (mount) {
    mountPageItem(newItem);
  }
  updatePageSettings();
  console.log('addPageItem');
  sendMainEvent('update:pages', virtuButtonPages);
  wsEmitCurrentPage();
}

/**
 * アイテムを更新する
 * 再mountされる
 */
export function editPageItem(item: PageItem | PageItemAdapted, mount = true) {
  const newItem = adaptPageItem(item);
  setVirtuButtonPages(
    produce((pages) => {
      for (const page of pages) {
        for (let i = 0; i < page.items.length; i++) {
          const prevItem = page.items[i];
          if (prevItem.id === item.id) {
            page.items[i] = newItem;
            break;
          }
        }
      }
    })
  );
  if (mount) {
    mountPageItem(newItem);
  }
  updatePageSettings();
  console.log('editPageItem');
  sendMainEvent('update:pages', virtuButtonPages);
  wsEmitButton(item);
}

/**
 * 表示用のPropsだけ更新する
 */
export function editPageItemViewProps(
  itemId: string,
  _props: Partial<ButtonViewProps>
) {
  console.log('editPageItemViewProps');
  const { temp, ...props } = _props;
  setVirtuButtonPages((pages) => {
    const newPages = structuredClone(pages);
    for (const page of newPages) {
      for (const item of page.items) {
        if (item.id !== itemId) continue;
        item.viewProps = {
          ...item.viewProps,
          ...props,
          temp: {
            ...item.viewProps.temp,
            ...temp,
          },
        };
        sendMainEvent('update:pageItem', item);
      }
    }
    return newPages;
  });
  updatePageSettings();
  sendMainEvent('update:pages', virtuButtonPages);
  wsEmitCurrentPage();
}

/**
 * アイテムの座標を更新する
 */
export function editPosPageItem(props: {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  layer: number;
}) {
  const { layer: zIndex, ...p } = props;
  editPageItemViewProps(props.id, { ...p, zIndex });
}

/**
 * PageItemを削除する
 * Pluginとの接続も切る
 */
export function deletePageItem(itemId: string) {
  const item = getPageItem(itemId);
  if (!item) return;

  // 登録を解除
  if (item.type === 'ControlButton') {
    destroyCBInstance(item);
  }

  setVirtuButtonPages(
    produce((pages) => {
      for (const page of pages) {
        page.items = page.items.filter((v) => v.id !== itemId);
      }
    })
  );
  updatePageSettings();
  sendMainEvent('update:pages', virtuButtonPages);
  wsEmitCurrentPage();
}

/**
 * PageItemを実行用に変換
 */
export function adaptPageItem(item: PageItem): PageItemAdapted {
  if (item.type === 'Button') {
    return item;
  } else {
    return adaptCBInstance(item);
  }
}

/**
 * PageItemAdaptedをPluginに接続
 */
export async function mountPageItem(item: PageItemAdapted) {
  if (item.type === 'Button') {
    // return item;
  } else {
    const res = await mountCBInstance(item);
    editPageItem(res, false);
  }
}

export function editPageItemStyleIndex(itemId: string, index: number) {
  const item = getPageItem(itemId);
  if (!item) return;
  const styleIndex = index % item.styles.length;
  editPageItemViewProps(itemId, { styleIndex });
}
