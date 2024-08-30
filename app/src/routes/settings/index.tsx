import { Settings } from '@/src-common/settings';
import { MaterialIcon } from '@/src/components/icon';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Switch } from '@/src/components/ui/switch';
import { ipcSend } from '@/src/ipcEvent';
import { useEffect, useId, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAsync } from 'react-use';

export default function RouteSettings() {
  const navigate = useNavigate();
  const { value: appTitle } = useAsync(async () => await ipcSend('get:title'));
  const { value: _settings } = useAsync(
    async () => await ipcSend('get:settings'),
    []
  );
  const [settings, setSettings] = useState(_settings);
  useEffect(() => {
    setSettings(_settings);
  }, [_settings]);

  const updateSettings = (obj: Partial<Settings>) => {
    setSettings((prev) => {
      if (!prev) return;
      return {
        ...prev,
        ...obj,
      };
    });
  };

  const s = /*tw*/ {
    section: 'flex flex-col p-2 gap-1',
    label: 'font-bold text-sm',
    desc: 'font-normal text-sm opacity-50',
  };

  const baseId = useId();

  return !settings ? (
    <></>
  ) : (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center gap-1 p-2 bg-card">
        <p className="font-bold">アプリケーション設定</p>
        <div className="ml-auto"></div>
        <Button
          size="with_icon"
          variant="outline"
          onClick={() => {
            ipcSend('edit:settings', {
              server: settings.server,
              openAtLogin: settings.openAtLogin,
            }).then(() => {
              navigate('/');
            });
          }}
        >
          <MaterialIcon icon="close" fill size={20} />
          保存して閉じる
        </Button>
      </div>
      <div className="flex-1 overflow-y-scroll flex flex-col p-2">
        <p className={s.desc}>
          設定を反映するにはアプリを再起動する必要があります
        </p>

        <div className={s.section}>
          <p className={s.label}>バージョン情報</p>
          <p>{appTitle}</p>
          <p>
            <a
              className="text-sky-500 flex gap-1 items-center"
              href="https://github.com/totoraj930/VirtuButton/"
            >
              GitHubを開く
              <MaterialIcon icon="open_in_browser" size="1rem" />
            </a>
          </p>
        </div>

        <hr />

        <div className={s.section}>
          <label className={s.label} htmlFor={baseId + 'server.port'}>
            使用するポート番号
          </label>
          <Input
            className="w-28"
            type="number"
            id={baseId + 'server.port'}
            value={settings.server.port}
            onChange={(e) => {
              const raw = e.target.value;
              const port = Number.parseInt(raw);
              updateSettings({
                server: {
                  port,
                  auth: settings.server.auth,
                },
              });
            }}
          />
        </div>

        <hr />

        <div className={s.section}>
          <label className={s.label} htmlFor={baseId + 'openAtLogin'}>
            パソコン起動時にVirtuButtonを起動する
          </label>
          <Switch
            id={baseId + 'openAtLogin'}
            checked={settings.openAtLogin}
            onCheckedChange={(value) => {
              updateSettings({
                openAtLogin: value,
              });
            }}
          />
        </div>

        <hr />
      </div>
    </div>
  );
}
