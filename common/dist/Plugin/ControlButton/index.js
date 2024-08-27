export * from './schema';
export * from './type';
export function toCBInstanceSerialized(cbInstance) {
    const { error, ...props } = cbInstance;
    return { ...props };
}
