import { IPCEventHandlers } from '@/src-common/ipcEvent';
import { clipboard } from 'electron';
import { appQuit, appRelaunch, TITLE } from '..';
import { openAppDir } from '../init';
import {
  addPage,
  addPageItem,
  deletePage,
  deletePageItem,
  editPage,
  editPageItem,
  getCBPayloadAll,
  getNewCBInstance,
  getNewHandler,
  getNewTask,
  getPageFromId,
  getPageFromIndex,
  virtuButtonPages,
} from '../Page';
import { getPluginPayloadAll } from '../Plugin';
import { getPluginActionPayloadAll } from '../Plugin/Action';
import { cancelActionTask, runButtonTasks } from '../Plugin/Action/task';
import { getPluginEventPayloadAll } from '../Plugin/Event';
import { getStaticFields } from '../Plugin/Field';
import { editSettings, getRemoteURL, settings } from '../settings';

export const ipcEventHandlers: IPCEventHandlers = {
  'app:relaunch': () => appRelaunch(),
  'app:quit': () => appQuit(),
  'get:title': () => TITLE,
  'get:settings': () => settings,
  'edit:settings': (_, values) => editSettings(values),
  'get:remoteURL': () => getRemoteURL(),
  'get:plugins': () => getPluginPayloadAll(),
  'get:pluginActions': () => getPluginActionPayloadAll(),
  'get:pluginEvents': () => getPluginEventPayloadAll(),
  'get:pluginCBs': () => getCBPayloadAll(),
  'get:pluginFields': (_, fieldsId, values) =>
    getStaticFields(fieldsId, values),

  // 'get:actionFields': (_, action, values) =>
  //   getPluginActionFields(action.pluginId, action.id, values),
  // 'get:eventFields': (_, pluginId, eventId, values) =>
  //   getPluginEventFields(pluginId, eventId, values),

  'get:newTask': (_, action) => getNewTask(action),
  'get:newHandler': (_, event) => getNewHandler(event),
  'get:newCBInstance': (_, cb) => getNewCBInstance(cb),

  'get:page': (_, props) => {
    if ('pageId' in props) {
      return getPageFromId(props.pageId);
    } else {
      return getPageFromIndex(props.pageIndex);
    }
  },
  'get:pages': (_) => virtuButtonPages,
  'edit:page': (_, pageId, values) => editPage(pageId, values),
  'add:page': (_, page) => addPage(page),
  'delete:page': (_, pageId) => deletePage(pageId),

  'add:item': (_, { pageId, item }) => addPageItem(pageId, item),
  'edit:item': (_, item) => editPageItem(item),
  'delete:button': (_, buttonId) => deletePageItem(buttonId),

  'copy:text': (_, text) => {
    clipboard.writeText(text);
  },

  'run:tasks': (_, tasks) => runButtonTasks(tasks),
  'cancel:tasks': (_, id) => {
    cancelActionTask(id);
  },

  'open:dir': (_, key) => openAppDir(key),
};
