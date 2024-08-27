import { MaterialIcon } from '@/src/components/icon';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { addEventListenerWithCleanup, cn } from '@/src/utils';
import { WebKeyCode } from '@virtu-button/common/Keyboard/web';
import {
  VirtualKey,
  webKeyCodeToVkMap,
} from '@virtu-button/common/Keyboard/windows';
import { KeyCombinationField } from '@virtu-button/common/Plugin';
import { useEffect, useId, useMemo, useRef, useState } from 'react';

type Props = {
  prop: KeyCombinationField;
  value: VirtualKey[];
  onChange?: (v: VirtualKey[]) => void;
};
export function KeyCombinationFieldInput({ prop, value: _v, onChange }: Props) {
  const [isRecording, setIsRecording] = useState(false);
  type F = () => void;
  const stopFunc = useRef<F | null>(null);
  const [keyList, setKeyList] = useState<VirtualKey[]>(structuredClone(_v));
  const viewKey = useMemo(() => {
    return keyList.map((vk) => vk.replace(/^VK_/, '')).join(' + ');
  }, [keyList]);
  const id = useId();

  useEffect(() => {
    setKeyList(_v);
  }, [_v]);

  return (
    <div className="flex flex-col flex-1">
      <label htmlFor={id} className="text-xs font-bold block p-0.5">
        {prop.name}
      </label>
      <div className="flex items-center gap-1">
        <Input
          value={viewKey}
          className={cn('focus-within:outline-none', {
            '-outline-offset-1 outline-1 outline-[#0ea5e9]': isRecording,
          })}
          readOnly
          disabled={prop.disabled}
          placeholder={prop.placeholder}
        />
        <Button
          size="icon"
          variant={isRecording ? 'default' : 'ghost'}
          disabled={prop.disabled}
          onClick={async () => {
            if (stopFunc.current) {
              stopFunc.current();
              stopFunc.current = null;
              return;
            }
            setIsRecording(true);
            const { stop, result } = recordKeyInput((keys) => {
              setKeyList(keys);
            });
            stopFunc.current = stop;
            const res = await result;
            setKeyList(res);
            onChange?.(res);
            stopFunc.current = null;
            setIsRecording(false);
          }}
        >
          <MaterialIcon icon="keyboard" />
        </Button>
        {isRecording && (
          <div
            className={cn('w-full h-full fixed top-0 left-0 z-[200]')}
            onClick={() => {
              stopFunc.current?.();
            }}
          ></div>
        )}
      </div>
    </div>
  );
}

export function recordKeyInput(
  progressHandler?: (keys: VirtualKey[]) => void
): { stop: () => void; result: Promise<VirtualKey[]> } {
  let _resolve: (a: VirtualKey[]) => void | undefined;
  const keys: Set<VirtualKey> = new Set();
  const result: Promise<VirtualKey[]> = new Promise((resolve) => {
    _resolve = resolve;
    const offDown = addEventListenerWithCleanup(
      document,
      'keydown',
      (event) => {
        event.preventDefault();
        event.stopPropagation();
        const key = webKeyCodeToVkMap[event.code as WebKeyCode];
        if (key) {
          keys.add(key);
          progressHandler?.(Array.from(keys));
        }
      }
    );
    const offUp = addEventListenerWithCleanup(document, 'keyup', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const key = webKeyCodeToVkMap[event.code as WebKeyCode];
      if (key) {
        keys.add(key);
        offDown();
        offUp();
        resolve(Array.from(keys));
      }
    });
  });
  return {
    result,
    stop: () => {
      _resolve(Array.from(keys));
    },
  };
}
