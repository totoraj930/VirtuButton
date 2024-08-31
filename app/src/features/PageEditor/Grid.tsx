import { cn } from '@/src/utils';
import { atom, useAtom } from 'jotai';
import { useEffect, useMemo, useRef, useState } from 'react';
import { getMaxSize } from '../PageView';

type Rect = {
  x: number;
  y: number;
  w: number;
  h: number;
};
export type Item = {
  id: string;
  layer: number;
  _tempPos?: Rect;
} & Rect;

type ChangeItemsEvent = {
  name: 'ChangeItems';
  items: Item[];
};

export type ItemEvent = ChangeItemsEvent;

export type GridProps = {
  items: Item[];
  w: number;
  h: number;
  handler: (event: ItemEvent) => void;
  renderer: (id: string) => React.ReactNode;
};

const aCellSize = atom(100);

export function Grid({
  items: _items,
  w: pageW,
  h: pageH,
  handler,
  renderer,
}: GridProps) {
  const [cellSize, setCellSize] = useAtom(aCellSize);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const divRef = useRef<HTMLDivElement | null>(null);
  const [items, setItems] = useState(structuredClone(_items));
  const resizeTimeout = useRef<number>();
  type EditStatus =
    | {
        type: 'Move';
        id: string;
        offsetX: number;
        offsetY: number;
      }
    | {
        type: 'Resize';
        id: string;
        offsetX: number;
        offsetY: number;
      };
  const status = useRef<EditStatus | null>(null);
  const itemViewMap = useMemo(() => {
    const viewMap: Map<string, React.ReactNode> = new Map();
    for (const item of _items) {
      viewMap.set(item.id, renderer(item.id));
    }
    return viewMap;
  }, [renderer, _items]);

  useEffect(() => {
    setItems(structuredClone(_items));
    console.log('=== items ===');
  }, [_items]);

  const editEnd = () => {
    const s = status.current;
    status.current = null;
    if (!s) return;
    document.body.classList.remove(
      /*tw*/ 'cursor-grabbing',
      'cursor-se-resize'
    );
    const tempItems = structuredClone(items);
    const layerMap: Map<number, number> = new Map();
    for (let i = 0; i < tempItems.length; i++) {
      const item = tempItems[i];
      const tempPos = item._tempPos;
      if (!tempPos) {
        layerMap.set(item.layer, item.layer);
        continue;
      }
      layerMap.set(200, 200);
      tempItems[i] = {
        ...item,
        w: Math.round(tempPos.w),
        h: Math.round(tempPos.h),
        x: Math.round(tempPos.x),
        y: Math.round(tempPos.y),
        layer: 200,
      };
    }
    const layers = Array.from(layerMap.keys()).sort((a, b) => a - b);
    for (let i = 0; i < layers.length; i++) {
      layerMap.set(layers[i], i);
    }

    const newItems = tempItems.map((item) => {
      if (item._tempPos) {
        delete item._tempPos;
      }
      item.layer = layerMap.get(item.layer) ?? 0;
      return item;
    });
    handler({
      name: 'ChangeItems',
      items: newItems,
    });
    setItems(newItems);
  };

  useEffect(() => {
    const onMouseUp = (event: MouseEvent) => {
      editEnd();
    };
    const onMouseMove = (event: MouseEvent) => {
      const s = status.current;
      const $div = divRef.current;
      if (!$div || !s) return;
      const item = items.find((v) => v.id === s.id);
      if (!item) return;
      switch (s.type) {
        case 'Move': {
          const rect = $div.getBoundingClientRect();
          let x = (event.clientX - rect.x) / cellSize - s.offsetX;
          let y = (event.clientY - rect.y) / cellSize - s.offsetY;
          x = Math.max(0, Math.min(pageW - item.w, x));
          y = Math.max(0, Math.min(pageH - item.h, y));
          setItems(
            items.map((item) => {
              if (item.id === s.id) {
                return {
                  ...item,
                  _tempPos: { x, y, w: item.w, h: item.h },
                };
              }
              return item;
            })
          );
          break;
        }
        case 'Resize': {
          const rect = $div.getBoundingClientRect();
          let w = (event.clientX - rect.x) / cellSize - item.x;
          let h = (event.clientY - rect.y) / cellSize - item.y;
          w = Math.max(1, Math.min(pageW - item.x, w));
          h = Math.max(1, Math.min(pageH - item.y, h));
          setItems(
            items.map((item) => {
              if (item.id === s.id) {
                return {
                  ...item,
                  _tempPos: { w, h, x: item.x, y: item.y },
                };
              }
              return item;
            })
          );
          break;
        }
      }
    };
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', onMouseMove);
    return () => {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    };
  });

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (!wrapRef.current) return;
      const rect = wrapRef.current.getBoundingClientRect();
      const maxRect = getMaxSize(
        { w: rect.width, h: rect.height },
        pageW / pageH
      );
      const s = Math.max(maxRect.w / pageW, 80);
      if (cellSize === s) return;
      if (typeof resizeTimeout.current === 'number') {
        window.cancelAnimationFrame(resizeTimeout.current);
      }
      resizeTimeout.current = window.requestAnimationFrame(() => {
        setCellSize(s);
      });
    });
    if (wrapRef.current) {
      observer.observe(wrapRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [setCellSize, pageH, pageW]);

  return (
    <>
      <div className={cn('w-full h-full p-1 overflow-auto')}>
        <div ref={wrapRef} className={cn('w-full h-full select-none')}>
          <div
            ref={divRef}
            className={cn('bg-card z-0')}
            style={{
              position: 'relative',
              width: cellSize * pageW,
              height: cellSize * pageH,
              border: `1px solid hsl(var(--border))`,
              backgroundImage: [
                `linear-gradient(0deg, transparent ${cellSize - 1}px, hsl(var(--border)) ${cellSize}px)`,
                `linear-gradient(90deg, transparent ${cellSize - 1}px, hsl(var(--border)) ${cellSize}px)`,
              ].join(','),
              backgroundSize: `${cellSize}px ${cellSize}px`,
              backgroundPosition: `-1px -1px`,
            }}
          >
            {items.map((item) => {
              const { w, h, x, y } = item._tempPos ?? item;
              const style: React.CSSProperties = {
                position: 'absolute',
                // width: w * cellSize,
                // height: h * cellSize,
                // top: y * cellSize,
                // left: x * cellSize,
                width: `${(w / pageW) * 100}%`,
                height: `${(h / pageH) * 100}%`,
                top: `${(y / pageH) * 100}%`,
                left: `${(x / pageW) * 100}%`,
                zIndex: item._tempPos ? 100 : item.layer,
                transitionProperty: item._tempPos
                  ? 'none'
                  : 'width, height, left, top',
                transitionDuration: '100ms',
              };
              return (
                <div
                  key={item.id}
                  onMouseDown={(event) => {
                    editEnd();
                    if (event.button !== 0) {
                      console.log('not left');
                      return;
                    }
                    const rect = event.currentTarget.getBoundingClientRect();
                    const x = (event.clientX - rect.x) / cellSize;
                    const y = (event.clientY - rect.y) / cellSize;
                    status.current = {
                      type: 'Move',
                      id: item.id,
                      offsetX: x,
                      offsetY: y,
                    };
                    document.body.classList.add(/*tw*/ 'cursor-grabbing');
                  }}
                  style={style}
                >
                  <div
                    className={cn(
                      'pointer-events-none',
                      'absolute top-0 left-0 w-full h-full'
                    )}
                  >
                    <div className={cn('w-full h-full')}>
                      {itemViewMap.get(item.id)}
                    </div>
                  </div>
                  {/* 右下のリサイズ */}
                  <button
                    type="button"
                    className={cn(
                      'absolute bottom-1 right-1 w-5 h-5',
                      'cursor-se-resize'
                    )}
                    onMouseDown={(event) => {
                      event.stopPropagation();
                      editEnd();
                      const rect = event.currentTarget.getBoundingClientRect();
                      const x = (event.clientX - rect.x) / cellSize;
                      const y = (event.clientY - rect.y) / cellSize;
                      status.current = {
                        type: 'Resize',
                        id: item.id,
                        offsetX: x,
                        offsetY: y,
                      };
                      document.body.classList.add(/*tw*/ 'cursor-se-resize');
                    }}
                  ></button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
