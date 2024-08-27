import { MaterialIcon } from '@/src/components/icon';
import { useModal } from '@/src/components/modal';
import { Button } from '@/src/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';
import { Input } from '@/src/components/ui/input';
import { ipcSend } from '@/src/ipcEvent';
import { usePage, usePageItem, useSettings } from '@/src/store';
import { cn } from '@/src/utils';
import { getDefaultButton, getDefaultPage } from '@virtu-button/common/Plugin';
import { useEffect, useState } from 'react';
import { CBDropdownMenuItems } from '../ButtonEditor/CBDropdownMenuItems';
import { PageItemEditor } from '../PageItemEditor';
import { PageItemView } from '../PageItemView';
import { PageNavButton } from '../PageNavButton';
import { Grid } from './Grid';

type Props = {
  pageIndex: number;
  onClose?: () => void;
};
export function PageEditor({ pageIndex, onClose }: Props) {
  const settings = useSettings();
  const { showConfirm } = useModal();
  const page = usePage(settings.pageIndex);
  const [editPageItemId, setEditPageItemId] = useState<string | null>(null);

  useEffect(() => {
    if (editPageItemId) {
      document.body.classList.add(/*tw*/ 'overflow-hidden');
    } else {
      document.body.classList.remove(/*tw*/ 'overflow-hidden');
    }
    return () => {
      document.body.classList.remove(/*tw*/ 'overflow-hidden');
    };
  }, [editPageItemId]);

  return !page ? (
    <></>
  ) : (
    <div className="flex flex-col w-full h-full">
      <div className="bg-card p-2 flex items-center gap-1">
        <PageNavButton />

        <DropdownMenu>
          <DropdownMenuTrigger variant="ghost" size="with_icon">
            <MaterialIcon icon="buttons_alt" />
            ボタンを追加
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <CBDropdownMenuItems
              onSelect={async (pCB) => {
                const instance = await ipcSend('get:newCBInstance', pCB);
                await ipcSend('add:item', {
                  pageId: page.id,
                  item: instance,
                });
              }}
            />
            <DropdownMenuItem
              onClick={() => {
                ipcSend('add:item', {
                  pageId: page.id,
                  item: getDefaultButton(),
                });
              }}
            >
              <div className="flex flex-col">
                <span>カスタムボタン</span>
                <span className="text-xs pl-2 opacity-50">
                  カスタマイズできるボタンです
                </span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="ghost"
          size="with_icon"
          onClick={async () => {
            const index = await ipcSend('add:page', getDefaultPage());
            await ipcSend('edit:settings', { pageIndex: index });
          }}
        >
          <MaterialIcon icon="note_add" />
          ページ追加
        </Button>

        {/* <div className="border-l h-full mx-2"></div> */}

        <div className="ml-auto"></div>
        <Button
          size="with_icon"
          variant="outline"
          onClick={() => {
            onClose?.();
          }}
        >
          <MaterialIcon icon="close" fill size={20} />
          編集終了
        </Button>
      </div>

      <div className="p-2 flex items-center gap-4">
        <p className="font-bold w-20">ページ: {pageIndex + 1}</p>
        <div className="flex items-center gap-1">
          <label htmlFor="" className="flex">
            <MaterialIcon icon="width" />
          </label>
          <Input
            type="number"
            className="w-20"
            value={page.w}
            min={1}
            max={20}
            onChange={(e) => {
              const num = Number.parseInt(e.target.value);
              if (!Number.isFinite(num) || num < 1 || num > 20) return;
              ipcSend('edit:page', page.id, { w: num });
            }}
          />
        </div>
        <div className="flex items-center gap-1">
          <label htmlFor="" className="flex">
            <MaterialIcon icon="height" />
          </label>
          <Input
            type="number"
            className="w-20"
            value={page.h}
            min={1}
            max={40}
            onChange={(e) => {
              const num = Number.parseInt(e.target.value);
              if (!Number.isFinite(num)) return;
              ipcSend('edit:page', page.id, { h: num });
            }}
          />
        </div>

        <Button
          size="with_icon"
          variant="delete"
          onClick={async () => {
            const result = await showConfirm({
              title: 'ページを削除します',
              message: 'この操作は取り消せません。本当にページを削除しますか？',
            });
            if (result) {
              await ipcSend('delete:page', page.id);
              // onClose?.();
            }
          }}
        >
          <MaterialIcon icon="delete" size={20} />
          ページを削除
        </Button>
      </div>
      <div className="flex-1 overflow-auto p-2">
        <Grid
          w={page.w}
          h={page.h}
          items={page.items.map((item) => {
            return {
              id: item.id,
              ...item.viewProps,
              layer: item.viewProps.zIndex,
            };
          })}
          handler={(event) => {
            if (event.name === 'ChangeItems') {
              const newPageItems = event.items.flatMap((item) => {
                const button = page.items.find(({ id }) => id === item.id);
                if (!button) return [];
                const newButton = structuredClone(button);
                newButton.viewProps = {
                  ...button.viewProps,
                  ...item,
                  zIndex: item.layer,
                };
                return [newButton];
              });
              ipcSend('edit:page', page.id, {
                items: newPageItems,
              });
            }
          }}
          renderer={(id) => (
            <Item
              id={id}
              onOpenEditor={(buttonId) => {
                setEditPageItemId(buttonId);
              }}
            />
          )}
        />
      </div>
      {editPageItemId && (
        <PageItemEditor
          itemId={editPageItemId}
          onClose={() => {
            setEditPageItemId(null);
          }}
        />
      )}
    </div>
  );
}

type ItemProps = {
  id: string;
  onOpenEditor: (buttonId: string) => void;
};
function Item({ id, onOpenEditor }: ItemProps) {
  const [pageItem, setter] = usePageItem(id);
  const { showConfirm } = useModal();
  const stopPropagationProps = {
    onMouseDown: (event: React.MouseEvent) => event.stopPropagation(),
  };
  return !pageItem ? (
    <></>
  ) : (
    <div className={cn('relative w-full h-full')}>
      <PageItemView item={pageItem} />
      <div className={cn('absolute w-full h-full top-0 left-0')}>
        {/* <button
          className={cn(
            'absolute top-1 right-1 cursor-pointer flex',
            'pointer-events-auto',
            'text-white drop-shadow-[0_0_1px_rgba(0,0,0,0.8)]'
          )}
          onClick={() => {
            onOpenEditor(id);
          }}
          {...stopPropagationProps}
        >
          <MaterialIcon icon="settings" fill size={26} />
        </button> */}

        <Button
          variant="ghost"
          size="icon_sm"
          className={cn(
            'absolute top-2 left-2 pointer-events-auto',
            'bg-black bg-opacity-50 text-white',
            'hover:bg-opacity-70 hover:text-white hover:bg-black',
            'hidden'
          )}
          {...stopPropagationProps}
          onClick={() => {
            onOpenEditor(id);
          }}
        >
          <MaterialIcon icon="menu" fill size={26} />
        </Button>

        <Button
          variant="ghost"
          size="icon_sm"
          className={cn(
            'absolute top-2 right-2 pointer-events-auto',
            'bg-black bg-opacity-50 text-white',
            'hover:bg-opacity-70 hover:text-white hover:bg-black'
          )}
          {...stopPropagationProps}
          onClick={() => {
            onOpenEditor(id);
          }}
        >
          <MaterialIcon icon="settings" fill size={26} />
        </Button>

        <Button
          variant="ghost"
          size="icon_sm"
          className={cn(
            'absolute bottom-2 left-2 pointer-events-auto',
            'bg-black bg-opacity-50 text-red-500',
            'hover:bg-opacity-70 hover:text-red-500 hover:bg-black'
          )}
          {...stopPropagationProps}
          onClick={async () => {
            const result = await showConfirm({
              title: 'ボタンを削除します',
              message: 'この操作は戻せません。本当に削除しますか？',
            });
            if (result) {
              ipcSend('delete:button', id);
            }
          }}
        >
          <MaterialIcon icon="delete" size={26} />
        </Button>

        <div
          className={cn(
            'absolute bottom-3 right-3 w-3 h-3',
            'border-2 border-l-0 border-t-0 border-white'
          )}
        ></div>
      </div>
    </div>
  );
}
