import { useEffect, useState } from 'react';

import { WsClient } from '@/src-common/ws/wsClient';
import { MaterialIcon } from '@/src/components/icon';
import { Button } from '@/src/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/src/components/ui/popover';
import { PageView } from '@/src/features/PageView';
import { cn } from '@/src/utils';
import { PageSerialized } from '@virtu-button/common/Plugin';
import { produce } from 'immer';

export const wsClient = new WsClient();

function App() {
  const [page, setPage] = useState<PageSerialized | null>(null);
  const [isCol, setIsCol] = useState(true);

  useEffect(() => {
    const onResize = () => {
      const rect = document.body.getBoundingClientRect();
      setIsCol(rect.width < rect.height);
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [setIsCol]);

  useEffect(() => {
    const off1 = wsClient.on('update:view', (data) => {
      // console.log('update:view');
      setPage(data);
    });
    const off2 = wsClient.on('update:item', (data) => {
      // console.log('update:item');
      setPage(
        produce((prev) => {
          if (!prev) return;
          prev.items = prev.items.map((item) => {
            if (item.id !== data.id) return item;
            return {
              ...item,
              ...data,
            };
          });
        })
      );
    });
    const off3 = wsClient.on('update:ivp', (data) => {
      // console.log('update:itemViewProps');
      setPage((prev) => {
        if (!prev) return prev;
        const newPage = structuredClone(prev);
        const { id: itemId, temp, ...props } = data;
        for (const item of newPage.items) {
          if (item.id !== itemId) continue;
          item.viewProps = {
            ...item.viewProps,
            ...props,
            temp: {
              ...item.viewProps.temp,
              ...temp,
            },
          };
        }
        return newPage;
      });
    });
    if (wsClient.status === undefined) {
      // wsClient.connect(`ws://${location.host}/ws`);
      const port = location.href.match(/:([0-9]+)/)?.[1] ?? 51030;
      wsClient.connect(`ws://${location.hostname}:${port}/ws`);
    }

    const onTouchMove = (event: TouchEvent) => {
      event.preventDefault();
      event.stopPropagation();
    };

    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.body.classList.add('light');

    return () => {
      off1();
      off2();
      off3();
      document.removeEventListener('touchmove', onTouchMove);
    };
  }, [setPage]);

  return (
    <div className="h-dvh w-dvw overflow-hidden">
      <div className="w-full h-full">
        {page && (
          <PageView
            page={page}
            handler={(event) => {
              wsClient.send(event);
            }}
          />
        )}
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon_sm"
            className={cn(
              'fixed rounded-full',
              'bg-white opacity-50',
              'dark:bg-accent',
              'shadow-sm z-50',
              {
                'right-4 bottom-4': true,
                // 'top-2 left-1/2 -translate-x-[18px]': true,
                // 'left-2 top-1/2 -translate-y-[18px]': !isCol,
              }
            )}
          >
            <MaterialIcon icon="menu" />
          </Button>
        </PopoverTrigger>
        <PopoverContent side="top" className="w-auto">
          <div className="flex justify-between gap-2">
            <Button
              variant="ghost"
              size="icon_sm"
              onClick={() => {
                wsClient.send({ name: 'page:prev' });
              }}
            >
              <MaterialIcon icon="chevron_left" />
            </Button>

            <Button
              variant="ghost"
              size="icon_sm"
              onClick={() => {
                document.location.reload();
              }}
            >
              <MaterialIcon icon="refresh" />
            </Button>

            <Button
              variant="ghost"
              size="icon_sm"
              onClick={() => {
                wsClient.send({ name: 'page:next' });
              }}
            >
              <MaterialIcon icon="chevron_right" />
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default App;
