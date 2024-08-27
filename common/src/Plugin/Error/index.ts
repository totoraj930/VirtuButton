export interface VBErrorOptions extends ErrorOptions {
  cause: {
    title?: string;
  };
}

/**
 * ベースとなるエラー
 */
export class VBError extends Error {
  constructor(message: string, options?: VBErrorOptions) {
    super(message, options);
    this.name = 'VBError';
    Object.setPrototypeOf(this, VBError.prototype);
  }
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
export class VBPluginError extends VBError {
  name = 'VBPluginError';
  constructor(message: string, options?: VBPluginErrorOptions) {
    super(message, options);
    this.name = 'VBPluginError';
    Object.setPrototypeOf(this, VBPluginError.prototype);
  }
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
export class VBPluginActionError extends VBPluginError {
  constructor(message: string, options?: VBPluginActionErrorOptions) {
    super(message, options);
    this.name = 'VBPluginActionError';
    Object.setPrototypeOf(this, VBPluginActionError.prototype);
  }
}
