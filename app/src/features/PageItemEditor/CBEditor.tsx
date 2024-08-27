import { MaterialIcon } from '@/src/components/icon';
import { useModal } from '@/src/components/modal';
import { Button } from '@/src/components/ui/button';
import { usePluginCB, usePluginFields } from '@/src/store';
import { cn } from '@/src/utils';
import { ControlButtonInstance } from '@virtu-button/common/Plugin';
import { useEffect, useMemo, useState } from 'react';
import { StylesEditor } from '../ButtonEditor/StyleEditor';
import { PluginFieldsEditor } from '../PluginFieldEditor';

type Props = {
  instance: ControlButtonInstance;
  setter: (cb: ControlButtonInstance) => Promise<void>;
  onClose: () => void;
};
export function CBInstanceEditor({
  instance: originInstance,
  setter,
  onClose,
}: Props) {
  const [instance, setInstance] = useState(structuredClone(originInstance));
  const hasChange = useMemo(() => {
    return JSON.stringify(originInstance) !== JSON.stringify(instance);
  }, [originInstance, instance]);
  const cb = usePluginCB(instance.pluginId, instance.controlButtonId);
  const [fields, errorText] = usePluginFields(
    cb?.fieldsId,
    instance.fieldValues
  );
  const { showConfirm } = useModal();

  useEffect(() => {
    setInstance(structuredClone(originInstance));
  }, [originInstance, setInstance]);

  const onKeydown = (event: KeyboardEvent) => {
    if (!instance) return;
    const key = event.key.toLowerCase();
    const withCtrl = event.ctrlKey || event.metaKey;
    if (key === 's' && withCtrl) {
      setter(instance);
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
                setter(instance);
                // onClose();
              }}
              variant={hasChange ? 'default' : 'ghost'}
            >
              <MaterialIcon icon="save" className="mr-1" fill />
              保存
            </Button>
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
              item={instance}
              onChange={(newButton) => {
                setInstance(newButton);
              }}
            />

            <div
              className={cn(
                'flex w-[300px] min-w-[300px] flex-col rounded bg-card border shadow'
              )}
            >
              {cb && (
                <>
                  <div className="p-2 border-b flex items-center">
                    <div className="flex-1">
                      <p className="font-bold">{cb.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {cb.description ?? 'ボタンの説明がありません'}
                      </p>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto event-none p-2">
                    {fields && (
                      <PluginFieldsEditor
                        fields={fields}
                        values={instance.fieldValues}
                        onChange={(newValues) => {
                          setInstance((prev) => {
                            return {
                              ...prev,
                              fieldValues: newValues,
                            };
                          });
                        }}
                      />
                    )}
                    {errorText && <p className="text-red-500">{errorText}</p>}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
