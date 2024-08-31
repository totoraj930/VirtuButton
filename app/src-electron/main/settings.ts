import { Config, zConfig } from '@/src-common/config';
import { Settings, zSettings } from '@/src-common/settings';
import { is } from '@electron-toolkit/utils';
import { app } from 'electron';
import fs from 'node:fs';
import { networkInterfaces } from 'node:os';
import path from 'node:path';
import { sendMainEvent } from './ipcEvent/mainEvent';

let saveTimer: NodeJS.Timeout | undefined = undefined;

const USER_DATA_DIR = is.dev
  ? path.join(app.getAppPath(), 'temp')
  : app.getPath('userData');
const CONFIG_FILE = path.join(USER_DATA_DIR, 'config.json');
const PROFILES_DIR = path.join(USER_DATA_DIR, 'profiles');
if (!fs.existsSync(PROFILES_DIR)) {
  fs.mkdirSync(PROFILES_DIR, { recursive: true });
}
const PLUGINS_DIR = path.join(USER_DATA_DIR, 'plugins');
if (!fs.existsSync(PLUGINS_DIR)) {
  fs.mkdirSync(PLUGINS_DIR, { recursive: true });
}

export const config = loadConfig();
// TODO: 起動オプションで変更できるようにする
const SETTINGS_FILE_NAME = true ? config.fileName : '';
export let settings = loadSettings();

export function loadConfig() {
  const isExists = fs.existsSync(CONFIG_FILE);
  if (!isExists) {
    return createDefaultConfig();
  } else {
    const raw = fs.readFileSync(CONFIG_FILE, { encoding: 'utf-8' });
    return parseConfig(raw);
  }
}

export function createDefaultConfig() {
  const defConfig = structuredClone(zConfig.parse({}));
  saveConfig(defConfig);
  return defConfig;
}

export function saveConfig(config: Config) {
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, '  '), {
    encoding: 'utf-8',
  });
}

export function parseConfig(raw: string) {
  try {
    return zConfig.parse(JSON.parse(raw));
  } catch (e) {
    console.log(e);
    return createDefaultConfig();
  }
}

// 設定ファイルを読み込む(無かったりエラーなら初期化)
export function loadSettings() {
  const SETTINGS_PATH = path.join(PROFILES_DIR, SETTINGS_FILE_NAME);
  const isExists = fs.existsSync(SETTINGS_PATH);
  let settings: Settings;
  if (!isExists) {
    settings = createDefaultFile();
  } else {
    const raw = fs.readFileSync(SETTINGS_PATH, { encoding: 'utf-8' });
    settings = parseSettings(raw);
  }
  return settings;
}

// 設定をパースする
function parseSettings(raw: string): Settings {
  try {
    const json = JSON.parse(raw);
    return zSettings.parse(json);
  } catch (e) {
    console.log(e);
    return getDefaultSettings();
  }
}

/**
 * 設定をファイルに保存
 * 連続して書き込まないように10msの遅延を設けている
 */
export function saveSettings(settings: Settings) {
  const SETTINGS_PATH = path.join(PROFILES_DIR, SETTINGS_FILE_NAME);
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    fs.writeFileSync(SETTINGS_PATH, JSON.stringify(settings, null, '  '), {
      encoding: 'utf-8',
    });
  }, 10);
}

// デフォルトの設定ファイルを作成
function createDefaultFile() {
  const defSettings = getDefaultSettings();
  saveSettings(defSettings);
  return defSettings;
}

// デフォルトの設定を作成
function getDefaultSettings() {
  return structuredClone(
    zSettings.parse({
      schemaVersion: 1,
    })
  );
}

type Setter = (prev: Settings) => Settings;
export function setSettings(setter: Setter, noSave: boolean = false) {
  const newSettings = setter(settings);
  settings = newSettings;
  if (!noSave) saveSettings(settings);
  sendMainEvent('update:settings', settings);
  return settings;
}

export function editSettings(values: Partial<Settings>) {
  return setSettings((prev) => {
    return { ...prev, ...values };
  });
}

export function changeCurrentPage(
  direction: 'prev' | 'next' | 'index',
  index?: number
) {
  let newIndex = settings.pageIndex;
  switch (direction) {
    case 'prev': {
      newIndex = newIndex - 1 + settings.pages.length;
      break;
    }
    case 'next': {
      newIndex = newIndex + 1;
      break;
    }
    case 'index': {
      newIndex = index ?? newIndex;
      break;
    }
  }
  newIndex = newIndex % settings.pages.length;
  editSettings({ pageIndex: newIndex });
  return newIndex;
}

export function getRemoteURL(): string | undefined {
  const localIP = getLocalIPv4();
  if (!localIP) return;
  return `http://${localIP}:${settings.server.port}/remote/`;
}

export function getLocalIPv4(): string | undefined {
  const interfaces = networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    const i = interfaces[name];
    if (!i) continue;
    for (const iface of i) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
}
