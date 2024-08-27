import { ulid } from 'ulid';
import { Button, ButtonTask, ButtonSerialized, ButtonAdapted } from './type';
import { zButtonStyle, zButtonViewProps } from './schema';
export type * from './type';
export * from './schema';
export * from './icon';

/**
 * ボタンの初期値を返す
 */
export function getDefaultButton(): Button {
  return structuredClone({
    id: ulid(),
    type: 'Button',
    handlers: [
      {
        id: ulid(),
        event: {
          pluginId: 'built-in:basic',
          eventId: 'button',
          fieldValues: {
            eventType: 'click',
          },
        },
        tasks: [],
      },
    ],
    styles: [structuredClone(zButtonStyle.parse({}))],
    viewProps: zButtonViewProps.parse({ zIndex: 100 }),
  });
}

export function toButtonSerialized(button: ButtonAdapted): ButtonSerialized {
  const { error, ...props } = button;
  return {
    ...props,
  };
}

export function getDefaultButtonTask(): ButtonTask {
  return structuredClone({
    id: ulid(),
    pluginId: 'built-in:basic',
    actionId: 'sleep',
    fieldValues: {
      duration: 1000,
    },
  });
}
