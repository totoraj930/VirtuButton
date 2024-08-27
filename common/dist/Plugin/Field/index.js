export * from './schema';
// PluginFieldsから初期値のActionParamsを作る
export function getDefaultFieldValues(fields) {
    const props = {};
    for (const key in fields) {
        const prop = fields[key];
        props[key] = prop.default;
    }
    return props;
}
