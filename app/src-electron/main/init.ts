import { is } from '@electron-toolkit/utils';
import { app, nativeTheme, shell } from 'electron';
import path from 'node:path';
import { basicFeaturesPlugin } from './built-in/basic-features';
import { keyboardPlugin } from './built-in/keyboard';
import { obsPlugin } from './built-in/obs';
import { addPages } from './Page';
import { addPlugins, initAllPlugin, initAllPluginCB } from './Plugin';
import { loadUserPlugin } from './Plugin/loader';
import { startServer } from './Server';
import { settings } from './settings';

const USER_DATA = app.getPath('userData');
export async function initApp() {
  // userDataをexeのあるディレクトリに変更(Cドライブを汚したくない)
  app.setPath('userData', path.dirname(app.getPath('exe')));
  console.log('exe:', path.dirname(app.getPath('exe')));
  console.log('app:', app.getAppPath());
  // login();
  startServer(settings.server.port);

  nativeTheme.themeSource = 'dark';

  const pluginsBasePath = is.dev
    ? path.join(app.getAppPath(), 'temp/plugins')
    : path.join(USER_DATA, 'plugins');
  const builtInPluginPath = path.join(pluginsBasePath, 'built-in');

  // built-inプラグインの登録
  addPlugins(
    {
      ...keyboardPlugin,
      path: builtInPluginPath,
    },
    {
      ...basicFeaturesPlugin,
      path: builtInPluginPath,
    },
    // {
    //   ...discordPlugin,
    //   path: builtInPluginPath,
    // },
    {
      ...obsPlugin,
      path: builtInPluginPath,
    }
  );

  try {
    loadUserPlugin(pluginsBasePath);
  } catch {}

  // ControlButton(Base)の初期化
  initAllPluginCB();

  // ページを初期化
  addPages(...settings.pages);

  // 登録したプラグインの初期化
  await initAllPlugin();

  console.log(import.meta.env.VITE_DISCORD_CLIENT_ID);
}

export function openAppDir(key: 'plugins' | 'profiles') {
  const basePath = is.dev ? path.join(app.getAppPath(), 'temp') : USER_DATA;
  shell.openExternal(path.join(basePath, key));
}
