export interface VBErrorOptions extends ErrorOptions {
    cause: {
        title?: string;
    };
}
/**
 * ベースとなるエラー
 */
export declare class VBError extends Error {
    constructor(message: string, options?: VBErrorOptions);
}
export interface VBPluginErrorOptions extends VBErrorOptions {
    cause: {
        title?: string;
        from: {
            pluginId: string;
        };
    };
}
/**
 * プラグインで使うエラー
 */
export declare class VBPluginError extends VBError {
    name: string;
    constructor(message: string, options?: VBPluginErrorOptions);
}
export interface VBPluginActionErrorOptions extends VBPluginErrorOptions {
    cause: {
        title?: string;
        from: {
            pluginId: string;
            actionId: string;
        };
    };
}
/**
 * プラグインのアクションで使うエラー
 */
export declare class VBPluginActionError extends VBPluginError {
    constructor(message: string, options?: VBPluginActionErrorOptions);
}
