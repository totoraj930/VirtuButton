import { Settings } from '@/src-common/settings';
import { WsClient } from '@/src-common/ws/wsClient';
import {
  Page,
  PageItem,
  PluginFieldValues,
  PluginStaticFields,
} from '@virtu-button/common/Plugin';
import { useEffect, useMemo, useState } from 'react';
import { useAsync } from 'react-use';
import { addMainEventListener, ipcSend } from './ipcEvent';

export const wsClient = new WsClient();

export function usePlugins() {
  const { value } = useAsync(async () => {
    return await ipcSend('get:plugins');
  });
  return value ?? [];
}

// PluginAction
export function usePluginActions() {
  const { value } = useAsync(async () => {
    return await ipcSend('get:pluginActions');
  });
  return value ?? [];
}
export function usePluginAction(pluginId: string, actionId: string) {
  const actions = usePluginActions();
  return actions.find((a) => a.pluginId === pluginId && a.id === actionId);
}

// PluginEvent
export function usePluginEvents() {
  const { value } = useAsync(async () => {
    return await ipcSend('get:pluginEvents');
  });
  return value ?? [];
}

export function usePluginEvent(pluginId: string, eventId: string) {
  const events = usePluginEvents();
  return events.find((e) => e.pluginId === pluginId && e.id === eventId);
}

// ControlButton
export function usePluginCBs() {
  const { value } = useAsync(async () => {
    return await ipcSend('get:pluginCBs');
  }, []);
  return value ?? [];
}

export function usePluginCB(pluginId: string, cbId: string) {
  const cbs = usePluginCBs();
  return cbs.find((cb) => cb.pluginId === pluginId && cb.id === cbId);
}

// PluginFields
export function usePluginFields(
  fieldsId: string | undefined,
  values?: PluginFieldValues
): [PluginStaticFields | undefined, string | undefined] {
  const valuesJson = useMemo(() => JSON.stringify(values ?? {}), [values]);

  const fields = useAsync(async () => {
    if (!fieldsId) return;
    return await ipcSend('get:pluginFields', fieldsId, values ?? {});
  }, [fieldsId, valuesJson]);

  const errorText = useMemo(() => {
    return fields.error
      ? fields.error.message.replace(/^.+?:\s/, '')
      : undefined;
  }, [fields]);
  return [fields.value, errorText];
}

let __settings: Settings = await ipcSend('get:settings');
export function useSettings() {
  const [settings, setSettings] = useState<Settings>(__settings);
  useEffect(() => {
    const removeListener = addMainEventListener(
      'update:settings',
      (_, settings) => {
        __settings = settings;
        setSettings(__settings);
      }
    );
    return removeListener;
  });
  return settings;
}

export function usePages() {
  const [pages, setPages] = useState<Page[]>([]);
  useEffect(() => {
    ipcSend('get:pages').then((res) => {
      setPages(res);
    });
    const off = addMainEventListener('update:pages', (_, res) => {
      setPages(res);
    });
    return off;
  }, [setPages]);
  return pages;
}

export function usePage(index: number) {
  const pages = usePages();
  return pages[index] ?? null;
}

export async function getPageItem(id: string) {
  const pages = await ipcSend('get:pages');
  let pageItem: PageItem | undefined;
  pages: for (const page of pages) {
    for (const item of page.items) {
      if (item.id === id) {
        pageItem = item;
        break pages;
      }
    }
  }
  return pageItem;
}

export function usePageItem(
  id: string
): [PageItem | null, (item: PageItem) => Promise<void>] {
  const pages = usePages();
  const [item, setItem] = useState<PageItem>();
  const setter = async (item: PageItem) => {
    await ipcSend('edit:item', item);
  };
  useEffect(() => {
    for (const page of pages) {
      const b = page.items.find((v) => v.id === id);
      if (b) {
        console.log('setItem from page');
        setItem(b);
        break;
      }
    }
    const off = addMainEventListener('update:pageItem', (_, i) => {
      if (id === i.id) {
        console.log('setItem from item');
        setItem(i);
      }
    });
    return () => {
      off();
    };
  }, [pages, id, setItem]);
  return [item ?? null, setter];
}

export function useRemoteURL() {
  const { value } = useAsync(async () => {
    return await ipcSend('get:remoteURL');
  });
  return value;
}
