/**
 * ベースとなるエラー
 */
export class VBError extends Error {
    constructor(message, options) {
        super(message, options);
        this.name = 'VBError';
        Object.setPrototypeOf(this, VBError.prototype);
    }
}
/**
 * プラグインで使うエラー
 */
export class VBPluginError extends VBError {
    name = 'VBPluginError';
    constructor(message, options) {
        super(message, options);
        this.name = 'VBPluginError';
        Object.setPrototypeOf(this, VBPluginError.prototype);
    }
}
/**
 * プラグインのアクションで使うエラー
 */
export class VBPluginActionError extends VBPluginError {
    constructor(message, options) {
        super(message, options);
        this.name = 'VBPluginActionError';
        Object.setPrototypeOf(this, VBPluginActionError.prototype);
    }
}
