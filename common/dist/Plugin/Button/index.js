import { ulid } from 'ulid';
import { zButtonStyle, zButtonViewProps } from './schema';
export * from './schema';
export * from './icon';
/**
 * ボタンの初期値を返す
 */
export function getDefaultButton() {
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
export function toButtonSerialized(button) {
    const { error, ...props } = button;
    return {
        ...props,
    };
}
export function getDefaultButtonTask() {
    return structuredClone({
        id: ulid(),
        pluginId: 'built-in:basic',
        actionId: 'sleep',
        fieldValues: {
            duration: 1000,
        },
    });
}
