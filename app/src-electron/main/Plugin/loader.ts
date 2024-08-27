import * as Electron from 'electron';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { Script, constants } from 'vm';
import { addPlugin, isValidPlugin } from '.';

export function loadUserPlugin(baseDir: string) {
  const dirs = fs.readdirSync(baseDir, { withFileTypes: true });
  for (const dir of dirs) {
    if (!dir.isDirectory()) continue;
    const files = fs.readdirSync(path.join(dir.parentPath, dir.name), {
      withFileTypes: true,
    });
    const pluginFiles: {
      baseDir: string;
      fileName: string;
    }[] = [];
    for (const file of files) {
      if (file.isFile() && file.name.match(/^index\.(cjs|js)$/)) {
        pluginFiles.push({
          baseDir: file.parentPath,
          fileName: file.name,
        });
        break;
      }
    }

    for (const p of pluginFiles) {
      try {
        console.log(p);
        const res = loadScript(p.fileName, p.baseDir);
        console.log(res);
        if (isValidPlugin(res)) {
          addPlugin({
            ...res,
            path: p.baseDir,
          });
        } else {
          console.log(p.baseDir, 'invalid plugin file.');
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
}

export function loadScript(fileName: string, baseDir: string) {
  const code = fs.readFileSync(path.join(baseDir, fileName), {
    encoding: 'utf-8',
  });
  const script = new Script(code, {
    filename: path.join(baseDir, fileName),
    importModuleDynamically: constants.USE_MAIN_CONTEXT_DEFAULT_LOADER,
  });

  const globalKeys = [
    ...Object.getOwnPropertyNames(globalThis),
    ...Object.getOwnPropertySymbols(globalThis),
  ];

  const sandbox: Record<string | symbol, any> = {
    process: { ...process, chdir: process.chdir, cwd: () => baseDir },
    require: createRequire(pathToFileURL(path.join(baseDir, 'index.js')).href),
    __dirname: baseDir,
    __filename: path.join(baseDir, fileName),
    Electron,
    module: {
      exports: {},
    },
  };

  // globalThisにあるものをsandboxにマッピングする
  // 定義済みならそのまま
  for (const key of globalKeys) {
    if (key in globalThis) {
      sandbox[key] = sandbox[key] ?? (globalThis as any)[key];
    }
  }

  script.runInNewContext(sandbox);
  const res: { [key: string]: any } = sandbox.module.exports;
  return res['plugin'] ?? res['default'] ?? {};
}
