import { is } from '@electron-toolkit/utils';
import {
  app,
  BrowserWindow,
  ipcMain,
  Menu,
  nativeImage,
  shell,
  Tray,
} from 'electron';
import { produce } from 'immer';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { initApp } from './init';
import { ipcEventHandlers } from './ipcEvent';
import { sendMainEvent } from './ipcEvent/mainEvent';
import { virtuButtonPages } from './Page';
import { setSettings, settings } from './settings';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const TITLE = `VirtuButton(β) ${app.getVersion()}`;

process.env.APP_ROOT = path.join(__dirname, '../..');
process.env.APP_DIR = is.dev
  ? app.getAppPath()
  : path.dirname(app.getPath('exe'));

// 初期化処理
initApp();

export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron');
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist');
export const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL;

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, 'public')
  : RENDERER_DIST;

const icon = path.join(process.env.VITE_PUBLIC, 'VirtuButton_icon_2.png');

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

export let win: BrowserWindow | null = null;
const preload = path.join(__dirname, '../preload/index.mjs');
const indexHtml = path.join(RENDERER_DIST, 'index.html');

async function createWindow(routePath: string = '/') {
  const ops = settings.windowPos;
  const tempWin = new BrowserWindow({
    title: TITLE,
    // icon: path.join(process.env.VITE_PUBLIC, 'favicon.ico'),
    icon,
    width: ops.w,
    height: ops.h,
    x: ops.x,
    y: ops.y,
    show: true,
    webPreferences: {
      preload,
      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      // nodeIntegration: true,

      // Consider using contextBridge.exposeInMainWorld
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
      // contextIsolation: false,
    },
  });

  if (!is.dev) {
    tempWin.setMenu(null);
    tempWin.menuBarVisible = false;
  }

  if (ops.isMaximized) {
    tempWin.maximize();
  }

  // ウィンドウの位置を保持
  tempWin.on('close', () => {
    saveWindowPos(false);
  });

  tempWin.on('ready-to-show', () => {
    win = tempWin;
    sendMainEvent('update:pages', virtuButtonPages);
  });

  openRoutePath(tempWin, routePath);

  if (VITE_DEV_SERVER_URL) {
    process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
    tempWin.webContents.openDevTools();
  }

  // Make all links open with the browser, not with the application
  // urlをelectronではなくブラウザで開く
  tempWin.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url);
    return { action: 'deny' };
  });

  tempWin.webContents.on('will-navigate', (e, url) => {
    if (url.startsWith('http')) shell.openExternal(url);
    e.preventDefault();
  });

  tempWin.webContents.on('page-title-updated', (e) => {
    tempWin.setTitle(TITLE);
  });

  // Auto update
  // update(win)
  return tempWin;
}

app.whenReady().then(() => {
  const appIcon = new Tray(nativeImage.createFromPath(icon));
  appIcon.setTitle(app.getName());
  appIcon.addListener('click', (e) => {
    openOrFocus();
  });

  appIcon.setTitle(TITLE);
  appIcon.setToolTip(TITLE);

  const contextMenu = Menu.buildFromTemplate([
    {
      label: TITLE,
      click: () => {
        openOrFocus();
      },
    },
    {
      label: '設定',
      click: () => {
        openOrFocus('/settings');
      },
    },
    {
      label: '再起動',
      click: () => {
        appRelaunch();
      },
    },
    {
      type: 'separator',
    },
    {
      label: `終了`,
      role: 'quit',
      click: () => {
        appQuit();
      },
    },
  ]);
  appIcon.setContextMenu(contextMenu);

  if (!settings.startMinimized) {
    createWindow();
  }
});

app.on('window-all-closed', () => {
  win = null;
  // if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});

// ipcHandleの登録
Object.entries(ipcEventHandlers).forEach(([eventName, handler]) => {
  ipcMain.handle(eventName, handler);
});

app.setUserTasks([]);

export function appRelaunch() {
  saveWindowPos();
  app.relaunch({
    args: process.argv.slice(1),
  });
  app.exit(0);
}

export function appQuit() {
  saveWindowPos();
  app.exit(0);
}

function openRoutePath(bWindow: BrowserWindow, routePath: string) {
  if (VITE_DEV_SERVER_URL) {
    bWindow.loadURL(VITE_DEV_SERVER_URL + '#' + routePath);
  } else {
    bWindow.loadFile(indexHtml, { hash: routePath });
  }
}

function openOrFocus(routePath = '/') {
  if (win) {
    if (win.isMinimized()) {
      win.restore();
    }
    win.focus();
    openRoutePath(win, routePath);
  } else {
    createWindow(routePath);
  }
}

function saveWindowPos(isShow: boolean = true) {
  if (!win) return;
  const [x, y] = win.getPosition();
  const [w, h] = win.getSize();
  const isMaximized = win.isMaximized();

  setSettings(
    produce((prev) => {
      const winPos = prev.windowPos;
      prev.windowPos = {
        ...winPos,
        x: isMaximized ? winPos.x : x,
        y: isMaximized ? winPos.y : y,
        w: isMaximized ? winPos.w : w,
        h: isMaximized ? winPos.h : h,
        isMaximized,
        isShow,
      };
    })
  );
}
