import { cn } from '@/src/utils';
import { PageSerialized } from '@virtu-button/common/Plugin';
import { useEffect, useMemo, useRef, useState } from 'react';
import { PageItemView } from '../PageItemView';

type PageButtonClickEvent = {
  name: 'button:click';
  buttonId: string;
};
type PageButtonDownEvent = {
  name: 'button:down';
  buttonId: string;
};
type PageButtonUpEvent = {
  name: 'button:up';
  buttonId: string;
};
type PageEvent = PageButtonClickEvent | PageButtonDownEvent | PageButtonUpEvent;

type Props = {
  page: PageSerialized;
  handler: (event: PageEvent) => void;
};

export function PageView({ page, handler }: Props) {
  const $wrap = useRef<HTMLDivElement | null>(null);
  const [wrapSize, setWrapSize] = useState({ w: 0, h: 0 });
  const viewPos = useMemo(() => {
    return getMaxSizeRect(wrapSize, page);
  }, [page, wrapSize]);
  const $pressedButtons = useRef<string[]>([]);
  const $onlyTouchEvent = useRef<boolean>(false);

  const onButtonClick = (buttonId: string) => {
    handler({ name: 'button:click', buttonId });
  };
  const onButtonDown = (buttonId: string) => {
    if ($pressedButtons.current.includes(buttonId)) return;
    $pressedButtons.current.push(buttonId);
    handler({ name: 'button:down', buttonId });
  };
  const onButtonUp = () => {
    for (const buttonId of $pressedButtons.current) {
      handler({ name: 'button:up', buttonId });
    }
    $pressedButtons.current = [];
    setTimeout(() => {
      $onlyTouchEvent.current = false;
      // alert(false);
    }, 10);
  };

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      const w = $wrap.current?.clientWidth ?? 0;
      const h = $wrap.current?.clientHeight ?? 0;
      setWrapSize({ w, h });
    });
    if ($wrap.current) {
      observer.observe($wrap.current);
    }
    const onMouseUp = (e: MouseEvent) => {
      if ($onlyTouchEvent.current) return;
      if ($pressedButtons.current.length === 0) return;
      e.preventDefault();
      e.stopPropagation();
      onButtonUp();
    };
    const onTouchEnd = (e: TouchEvent) => {
      if ($pressedButtons.current.length === 0) return;
      e.preventDefault();
      e.stopPropagation();
      onButtonUp();
    };
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('touchend', onTouchEnd);
    return () => {
      observer.disconnect();
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return (
    <div
      className={cn(
        'w-full h-full relative overflow-hidden',
        'grid place-content-center select-none'
      )}
      ref={$wrap}
    >
      <div
        className={cn('relative bg-card')}
        style={{
          width: !viewPos.rotate ? viewPos.w : viewPos.h,
          height: !viewPos.rotate ? viewPos.h : viewPos.w,
          // rotate: `${viewPos.angle}deg`,
          transformOrigin: 'center',
          // backgroundImage: `url(${demo})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        {page.items.map((item) => {
          const { x, y, w, h, zIndex } = item.viewProps;
          const { rotate } = viewPos;

          const top = `${(y / page.h) * 100}%`;
          const left = `${(x / page.w) * 100}%`;
          const width = `${(w / page.w) * 100}%`;
          const height = `${(h / page.h) * 100}%`;
          const style: React.CSSProperties = {
            top: !rotate ? top : left,
            left: !rotate ? left : 'auto',
            right: !rotate ? 'auto' : top,
            width: !rotate ? width : height,
            height: !rotate ? height : width,
            zIndex,
          };
          return (
            <div
              key={item.id}
              className={cn('w-full h-full absolute')}
              style={style}
            >
              <div className={cn('w-full h-full')}>
                <PageItemView
                  item={item}
                  className="cursor-pointer active:translate-y-[2px]"
                  role="button"
                  onClick={() => {
                    if ($onlyTouchEvent.current) return;
                    onButtonClick(item.id);
                  }}
                  onMouseDown={() => {
                    if ($onlyTouchEvent.current) return;
                    onButtonDown(item.id);
                  }}
                  onTouchStart={() => {
                    $onlyTouchEvent.current = true;
                    onButtonDown(item.id);
                  }}
                  onTouchEnd={() => {
                    if ($pressedButtons.current.includes(item.id)) {
                      onButtonClick(item.id);
                    }
                  }}
                  onContextMenu={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

type Rect = {
  w: number;
  h: number;
};

// 指定された寸法に収まる最大サイズを計算する関数
export function getMaxSize(container: Rect, aspectRatio: number): Rect {
  const widthByHeight = container.h * aspectRatio;
  const heightByWidth = container.w / aspectRatio;

  if (widthByHeight <= container.w) {
    return { w: widthByHeight, h: container.h };
  } else {
    return { w: container.w, h: heightByWidth };
  }
}
export function getMaxSizeRect(a: Rect, b: Rect): Rect & { rotate: boolean } {
  const aspectRatioB = b.w / b.h;

  // 両方の向きでの最大サイズを計算
  const sizeWithoutRotation = getMaxSize(a, aspectRatioB);
  const rotatedA: Rect = { w: a.h, h: a.w };
  const sizeWithRotation = getMaxSize(rotatedA, aspectRatioB);

  // 2つのサイズのうち大きい方を返す
  return sizeWithoutRotation.w * sizeWithoutRotation.h >=
    sizeWithRotation.w * sizeWithRotation.h
    ? { ...sizeWithoutRotation, rotate: false }
    : { ...sizeWithRotation, rotate: true };
}
