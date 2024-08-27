import { MaterialIcon } from '@/src/components/icon';
import { cn } from '@/src/utils';
import {
  ButtonStyle,
  ButtonViewProps,
  zButtonStyle,
} from '@virtu-button/common/Plugin';
import { useEffect, useMemo, useRef, useState } from 'react';

type Props = {
  // button: ButtonSerialized | Button;
  buttonStyles: ButtonStyle[];
  viewProps: ButtonViewProps;
  rotate?: boolean;
} & React.ComponentPropsWithoutRef<'div'>;

const BASE_SIZE = 1000;
export function ButtonView({
  buttonStyles,
  viewProps,
  rotate,
  className,
  style,
  ...props
}: Props) {
  const $wrap = useRef<HTMLDivElement | null>(null);
  // const [sideLength, setSideLength] = useState(0);
  const [scale, setScale] = useState(0);
  const styleIndex = viewProps.styleIndex;
  const buttonStyle =
    buttonStyles[styleIndex] ?? structuredClone(zButtonStyle.parse({}));
  const buttonTitle = useMemo(() => {
    return buttonStyle.text.length === 0
      ? viewProps.temp?.title
      : buttonStyle.text;
  }, [buttonStyle, viewProps]);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (!$wrap.current) return;
      const wrapRect = $wrap.current.getBoundingClientRect();
      // const wrapSize = Math.max(wrapRect.width, wrapRect.height);
      const sLength = Math.min(wrapRect.width, wrapRect.height);
      // setSideLength(sLength);
      setScale(sLength / BASE_SIZE);
      $wrap.current.classList.remove('bg-blur');
      requestAnimationFrame(() => {
        $wrap.current?.classList.add('bg-blur');
      });
    });
    if ($wrap.current) {
      observer.observe($wrap.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [buttonStyles, viewProps]);
  return (
    <div
      className="w-full h-full"
      style={{
        padding: `${(30 * scale) / Math.min(viewProps.w, viewProps.h)}px`,
      }}
    >
      <div
        {...props}
        className={cn(
          'w-full h-full rounded-lg relative',
          'shadow-[0_0_3px_rgba(0,0,0,0.7)]',
          className
        )}
        ref={$wrap}
        style={{
          ...style,
        }}
      >
        <div
          className={cn('w-full h-full rounded-lg absolute top-0 left-0')}
          style={{
            backgroundColor: buttonStyle.color.background,
            opacity: buttonStyle.bgOpacity,
          }}
        ></div>
        <div
          className={cn(
            'flex flex-col items-center justify-center',
            'absolute overflow-hidden'
          )}
          style={{
            color: buttonStyle.color.text,
            width: BASE_SIZE,
            height: BASE_SIZE,
            top: '50%',
            left: '50%',
            scale: `${scale * 100}%`,
            rotate: rotate ? '270deg' : '0deg',
            translate: `-${BASE_SIZE / 2}px -${BASE_SIZE / 2}px`,
            transformOrigin: 'center',
            WebkitBackfaceVisibility: 'hidden',
            WebkitFontSmoothing: 'antialiased',
            imageRendering: 'pixelated',
            fontFamily: `"Noto Sans JP", "Noto Color Emoji", sans-serif`,
            // textShadow: `0px 0px 20px rgba(0, 0, 0, 0.4)`,
          }}
        >
          {buttonStyle.icon && (
            <MaterialIcon
              icon={buttonStyle.icon as any}
              fill
              size={700}
              // className="drop-shadow-[0_0_20px_rgba(0,0,0,0.4)]"
            />
          )}
          {buttonTitle && buttonTitle.length > 0 && (
            <p
              style={{
                fontSize: `${buttonStyle.textSize}px`,
                marginBottom: `${buttonStyle.textSize * 0.16}px`,
              }}
              className={cn(
                'font-[800] text-[110px] text-center leading-none text-balance',
                'flex justify-center items-center'
                // 'drop-shadow-[0_0_20px_rgba(0,0,0,0.4)]'
              )}
            >
              {buttonTitle}
            </p>
          )}
        </div>
        {/* <div
          style={{ color: buttonStyle.color.text }}
          className={cn(
            'w-0 h-0 absolute left-1/2 top-1/2',
            'pointer-events-none backdrop-blur-none'
          )}
        >
          
        </div> */}
      </div>
    </div>
  );
}
