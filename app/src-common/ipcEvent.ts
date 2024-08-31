import { getPluginPayloadAll } from '@/src-electron/main/Plugin';
import type { getPluginActionPayloadAll } from '@/src-electron/main/Plugin/Action';
import type { runButtonTasks } from '@/src-electron/main/Plugin/Action/task';
import { getPluginEventPayloadAll } from '@/src-electron/main/Plugin/Event';
import { getRemoteURL } from '@/src-electron/main/settings';
import {
  ButtonHandler,
  ButtonTask,
  ControlButtonInstance,
  ControlButtonSerialized,
  Page,
  PageItem,
  PageSerialized,
  PluginActionSerialized,
  PluginEventSerialized,
  PluginFieldValues,
  PluginStaticFields,
} from '@virtu-button/common/Plugin';
import { Settings } from './settings';

// Renderer -> Main

export type IPCEventHandle = {
  params: any[];
  result: any;
};

export type IPCEventParams = {
  'app:relaunch': {
    params: [];
    result: void;
  };
  'app:quit': {
    params: [];
    result: void;
  };
  'get:title': {
    params: [];
    result: string;
  };
  'get:settings': {
    params: [];
    result: Settings;
  };
  'edit:settings': {
    params: [Partial<Settings>];
    result: void;
  };
  'get:remoteURL': {
    params: [];
    result: ReturnType<typeof getRemoteURL>;
  };
  'get:plugins': {
    params: [];
    result: ReturnType<typeof getPluginPayloadAll>;
  };
  'get:pluginActions': {
    params: [];
    result: ReturnType<typeof getPluginActionPayloadAll>;
  };
  'get:pluginEvents': {
    params: [];
    result: ReturnType<typeof getPluginEventPayloadAll>;
  };
  'get:pluginCBs': {
    params: [];
    result: ControlButtonSerialized[];
  };
  'get:pluginFields': {
    params: [string, PluginFieldValues];
    result: Promise<PluginStaticFields>;
  };

  // 'get:actionFields': {
  //   params: [PluginActionPayload, PluginFieldValues];
  //   result: Promise<PluginFields>;
  // };
  // 'get:eventFields': {
  //   params: [string, string, PluginFieldValues];
  //   result: Promise<PluginFields>;
  // };

  'get:newTask': {
    params: [PluginActionSerialized];
    result: Promise<ButtonTask>;
  };
  'get:newHandler': {
    params: [PluginEventSerialized];
    result: Promise<ButtonHandler>;
  };
  'get:newCBInstance': {
    params: [ControlButtonSerialized];
    result: Promise<ControlButtonInstance>;
  };

  'get:page': {
    params: [{ pageIndex: number } | { pageId: string }];
    result: Page | null;
  };
  'get:pages': {
    params: [];
    result: Page[];
  };
  'edit:page': {
    params: [string, Partial<Omit<PageSerialized, 'id'>>];
    result: void;
  };
  'add:page': {
    params: [Page];
    result: number;
  };
  'delete:page': {
    params: [string];
    result: void;
  };

  'add:item': {
    params: [{ pageId: string; item: PageItem }];
    result: void;
  };
  'edit:item': {
    params: [PageItem];
    result: void;
  };
  'delete:button': {
    params: [string];
    result: void;
  };

  'copy:text': {
    params: [string];
    result: void;
  };

  'cancel:tasks': { params: [string]; result: void };
  'run:tasks': {
    params: [ButtonTask[]];
    result: ReturnType<typeof runButtonTasks>;
  };

  'open:dir': {
    params: ['profiles' | 'plugins'];
    result: void;
  };
};

export type IPCEventHandlers = {
  [K in keyof IPCEventParams]: (
    event: Electron.IpcMainInvokeEvent,
    ...args: IPCEventParams[K]['params']
  ) => IPCEventParams[K]['result'];
};
