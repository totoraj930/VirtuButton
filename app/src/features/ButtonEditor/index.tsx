import { MaterialIcon } from '@/src/components/icon';
import { useModal } from '@/src/components/modal';
import { Button } from '@/src/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';
import { ipcSend } from '@/src/ipcEvent';
import { cn } from '@/src/utils';
import { Button as PluginButton } from '@virtu-button/common/Plugin';
import { useEffect, useMemo, useState } from 'react';
import { EventDropdownMenuItems } from './EventDropdownMenuItems';
import { SortableHandlers } from './Sortable';
import { StylesEditor } from './StyleEditor';

type Props = {
  button: PluginButton;
  setter: (button: PluginButton) => Promise<void>;
  onClose: () => void;
};

export function ButtonEditor({ button: _button, setter, onClose }: Props) {
  const [prevButton, setPrevButton] = useState(_button);
  const [button, setButton] = useState(structuredClone(_button));

  const { showConfirm } = useModal();
  const hasChange = useMemo(() => {
    return JSON.stringify(prevButton) !== JSON.stringify(button);
  }, [prevButton, button]);

  const onKeydown = (event: KeyboardEvent) => {
    if (!button) return;
    const key = event.key.toLowerCase();
    const withCtrl = event.ctrlKey || event.metaKey;
    if (key === 's' && withCtrl) {
      setter(button);
      setPrevButton(button);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeydown);
    return () => {
      document.removeEventListener('keydown', onKeydown);
    };
  }, [onKeydown]);

  return (
    <>
      <div
        className={cn(
          'fixed top-0 left-0 z-0',
          'w-full h-full overflow-auto select-auto bg-background'
        )}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full w-full">
          <div className="flex flex-nowrap p-2 gap-2 items-center bg-card">
            <Button
              size="with_icon"
              onClick={() => {
                setter(button);
                setPrevButton(button);
                // onClose();
              }}
              variant={hasChange ? 'default' : 'ghost'}
            >
              <MaterialIcon icon="save" className="mr-1" fill />
              保存
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger variant="ghost" size="with_icon">
                <MaterialIcon icon="bolt" fill />
                イベントを追加
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <EventDropdownMenuItems
                  onSelect={async (pEvent) => {
                    const newHandler = await ipcSend('get:newHandler', pEvent);
                    setButton((prev) => {
                      if (!prev) return prev;
                      const res = structuredClone(prev);
                      res.handlers.push(newHandler);
                      return res;
                    });
                  }}
                />
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              className="ml-auto"
              size="with_icon"
              variant="outline"
              onClick={async () => {
                if (hasChange) {
                  const result = await showConfirm({
                    title: '保存されていない変更があります',
                    message: '本当に閉じますか？',
                  });
                  if (result) {
                    onClose();
                  }
                } else {
                  onClose();
                }
              }}
            >
              <MaterialIcon icon="close" fill size={20} />
              閉じる
            </Button>
          </div>

          <div className="flex flex-nowrap flex-1 overflow-x-scroll p-2 gap-2">
            <StylesEditor
              item={button}
              onChange={(newButton) => {
                setButton(newButton);
              }}
            />
            <SortableHandlers
              button={button}
              onChange={(newButton) => {
                setButton(newButton);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
