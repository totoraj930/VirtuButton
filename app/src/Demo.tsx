import { testFunction } from '@virtu-button/common';
import { DEMO } from '@virtu-button/common/demo';
import { useAtomValue } from 'jotai';
import { QRCodeSVG } from 'qrcode.react';
import { useEffect, useMemo, useState } from 'react';
import { MaterialIcon } from './components/icon';
import { aModalNodeView } from './components/modal';
import { Button } from './components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './components/ui/dropdown-menu';
import { Input } from './components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './components/ui/popover';
import { PageEditor } from './features/PageEditor';
import { PageNavButton } from './features/PageNavButton';
import { PageView } from './features/PageView';
import { ipcSend } from './ipcEvent';
import { useRemoteURL, useSettings, wsClient } from './store';
import { cn } from './utils';

export function Demo() {
  const settings = useSettings();
  const [editorOpen, setEditorOpen] = useState(false);
  const modals = useAtomValue(aModalNodeView);
  const page = useMemo(() => {
    return settings.pages[settings.pageIndex];
  }, [settings]);

  useEffect(() => {
    document.body.classList.add('dark');
    if (wsClient.status === undefined) {
      wsClient.connect(`ws://localhost:${settings.server.port}/ws`);
    }
    const off1 = wsClient.on('update:view', (p) => {
      // console.log(p);
    });
    return () => {
      off1();
    };
  }, []);

  return (
    <>
      {editorOpen && (
        <PageEditor
          pageIndex={settings.pageIndex}
          onClose={() => setEditorOpen(false)}
        />
      )}

      {!editorOpen && (
        <div className="w-full h-full flex flex-col">
          <div className={cn('flex items-center gap-1 p-2 bg-card')}>
            <PageNavButton />
            <Button
              variant="ghost"
              size="with_icon"
              onClick={() => setEditorOpen(true)}
            >
              <MaterialIcon icon="settings" fill />
              編集モード
            </Button>

            <Button
              onClick={() => {
                testFunction();
                console.log(DEMO);
              }}
            >
              テスト
            </Button>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="with_icon" className="ml-auto">
                  <MaterialIcon icon="conversion_path" />
                  URLを表示
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-2">
                <div>
                  <RemoteURL />
                </div>
              </PopoverContent>
            </Popover>

            <DropdownMenu>
              <DropdownMenuTrigger variant="ghost" size="with_icon">
                <MaterialIcon icon="folder_open" fill />
                <span>フォルダを開く</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  className="flex gap-2"
                  onClick={() => ipcSend('open:dir', 'profiles')}
                >
                  <MaterialIcon icon="settings_applications" fill />
                  <span>プロファイル</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex gap-2"
                  onClick={() => ipcSend('open:dir', 'plugins')}
                >
                  <MaterialIcon icon="code_blocks" fill />
                  <span>プラグイン</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger variant="ghost" size="icon">
                <MaterialIcon icon="power_settings_new" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  className="flex gap-2"
                  onClick={() => ipcSend('app:relaunch')}
                >
                  <MaterialIcon icon="reset_wrench" />
                  <span>再起動</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex gap-2"
                  onClick={() => ipcSend('app:quit')}
                >
                  <MaterialIcon icon="power_settings_new" />
                  <span>終了</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {page && (
            <PageView
              page={page}
              handler={(e) => {
                wsClient.send(e);
              }}
            />
          )}
        </div>
      )}
      {/* <PageView2 /> */}
      {modals}
    </>
  );
}

function RemoteURL() {
  const remoteURL = useRemoteURL();
  return (
    <>
      {!remoteURL && <p>URLの生成に失敗しました</p>}
      {remoteURL && (
        <div className="flex flex-col gap-2">
          <div className="">
            <QRCodeSVG
              value={remoteURL}
              size={200}
              includeMargin
              // imageSettings={{
              //   src: electronSVG,
              //   height: 20,
              //   width: 20,
              //   excavate: true,
              // }}
            />
          </div>
          <div className="flex gap-2 items-center">
            <Input value={remoteURL} onChange={() => {}} />
            <Button
              variant="ghost"
              size="icon_sm"
              onClick={() => {
                ipcSend('copy:text', remoteURL);
              }}
            >
              <MaterialIcon icon="content_copy" />
            </Button>
          </div>
          <div>
            <p className="text-xs">
              同じローカルネットワーク内のデバイスのみ接続できます
            </p>
          </div>
        </div>
      )}
    </>
  );
}
