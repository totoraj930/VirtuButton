import {
  getDefaultPage,
  Page,
  PageAdapted,
  PageItemAdapted,
  PageItemSerialized,
  PageSerialized,
  toButtonSerialized,
  toCBInstanceSerialized,
} from '@virtu-button/common/Plugin';
import { produce } from 'immer';
import { sendMainEvent } from '../ipcEvent/mainEvent';
import { wsEmitCurrentPage } from '../Server/ws';
import { editSettings, setSettings, settings } from '../settings';
import { adaptPageItem } from './PageItem';

export * from './Button';
export * from './ControlButton';
export * from './PageItem';

export let virtuButtonPages: PageAdapted[] = [];

export function setVirtuButtonPages(
  setter: (prev: typeof virtuButtonPages) => typeof virtuButtonPages
) {
  virtuButtonPages = setter(virtuButtonPages);
}

/**
 * Pageの情報をsettingsに書き込む
 */
export function updatePageSettings() {
  setSettings(
    produce((prev) => {
      prev.pages = virtuButtonPages;
    })
  );
}

export function toPageItemSerialized(
  item: PageItemAdapted
): PageItemSerialized {
  switch (item.type) {
    case 'Button': {
      return toButtonSerialized(item);
    }
    case 'ControlButton': {
      return toCBInstanceSerialized(item);
    }
  }
}

/**
 * 全ページを表示用として取得する
 */
export function getPageSerializedAll() {
  const pages = virtuButtonPages.map(toPageSerialized);
  return pages;
}

export function toPageSerialized(page: PageAdapted): PageSerialized {
  return {
    ...page,
    items: page.items.map(toPageItemSerialized),
  };
}

export function getCurrentPageViewPayload() {
  return toPageSerialized(virtuButtonPages[settings.pageIndex]);
}

export function editPage(
  pageId: string,
  values: Partial<Omit<PageSerialized, 'id'>>
) {
  virtuButtonPages = virtuButtonPages.map((page) => {
    if (page.id !== pageId) return page;
    const { ...newProps } = values;
    return {
      ...page,
      ...newProps,
    };
  });
  updatePageSettings();
  console.log('editPage');
  sendMainEvent('update:pages', virtuButtonPages);
  wsEmitCurrentPage();
}

/**
 * ページを削除する
 */
export function deletePage(id: string) {
  virtuButtonPages = virtuButtonPages.filter((page) => page.id !== id);
  if (virtuButtonPages.length === 0) {
    const defaultPage = adaptPage(getDefaultPage());
    virtuButtonPages = [defaultPage];
  }
  if (!virtuButtonPages[settings.pageIndex]) {
    editSettings({ pageIndex: virtuButtonPages.length - 1 });
  }
  updatePageSettings();
  console.log('deletePage');
  sendMainEvent('update:pages', virtuButtonPages);
  wsEmitCurrentPage();
}

/**
 * ページを登録する
 */
export function adaptPage(page: Page): PageAdapted {
  const { items, ...props } = page;
  return {
    ...props,
    items: items
      .map((item) => adaptPageItem(item))
      .filter((item) => item !== null),
  };
}

/**
 * ページを追加する
 */
export function addPage(page: Page) {
  const pageAdapted = adaptPage(page);
  virtuButtonPages = [...virtuButtonPages, pageAdapted];
  updatePageSettings();
  console.log('addPage');
  sendMainEvent('update:pages', virtuButtonPages);
  return virtuButtonPages.length - 1;
}

/**
 * ページをまとめて追加する
 */
export function addPages(...pages: Page[]) {
  for (const page of pages) {
    addPage(page);
  }
}

export function getPageFromId(pageId: string) {
  return virtuButtonPages.find((v) => v.id === pageId) ?? null;
}

export function getPageFromIndex(index: number) {
  return virtuButtonPages[index] ?? null;
}

export function getUsingPluginIds() {
  const pluginIds: Set<string> = new Set();
  for (const page of virtuButtonPages) {
    for (const item of page.items) {
      if (item.type === 'Button') {
        for (const handler of item.handlers) {
          pluginIds.add(handler.event.pluginId);
          for (const task of handler.tasks) {
            pluginIds.add(task.pluginId);
          }
        }
      } else if (item.type === 'ControlButton') {
        pluginIds.add(item.pluginId);
      }
    }
  }
  return Array.from(pluginIds);
}
