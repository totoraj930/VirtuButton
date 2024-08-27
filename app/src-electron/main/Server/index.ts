import { is } from '@electron-toolkit/utils';
import { ServerType, serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { createNodeWebSocket } from '@hono/node-ws';
import { Hono } from 'hono';
import { WSContext } from 'hono/ws';
import { wsHandler } from './ws';

export let server: ServerType;
export const wsContexts: Set<WSContext> = new Set();

export function startServer(port: number): void {
  if (server) {
    server.close();
    for (const ws of wsContexts) {
      ws.close();
    }
  }

  const app = new Hono();
  const { injectWebSocket, upgradeWebSocket } = createNodeWebSocket({ app });

  // https://github.com/honojs/middleware/issues/595
  global.CloseEvent = class CloseEvent extends Event {
    wasClean = false;
    code = 0;
    reason = '';
    constructor(type: string, eventInitDict = {}) {
      super(type, eventInitDict);
      // @ts-ignore
      if (eventInitDict['wasClean']) this.wasClean = eventInitDict['wasClean'];
      // @ts-ignore
      if (eventInitDict['code']) this.code = eventInitDict['code'];
      // @ts-ignore
      if (eventInitDict['reason']) this.reason = eventInitDict['reason'];
    }
  };

  app.get('/', (c) => {
    return c.text('Hello Hono!');
  });
  // ロギングミドルウェア
  app.use('*', async (c, next) => {
    console.log(`Request to: ${c.req.url}`);
    await next();
  });
  const remotePath = is.dev ? 'dist-remote' : 'remote';
  console.log('staticRoot: ', remotePath);
  app.use(
    '/remote/*',
    serveStatic({
      root: remotePath,
      rewriteRequestPath: (path) => {
        // path: /remote/* -> /*
        return path.replace(/^\/remote/, '');
      },
      onNotFound: (path, c) => {
        console.log('onNotFound', path);
      },
    })
  );

  app.get('/ws', upgradeWebSocket(wsHandler));

  server = serve(
    {
      fetch: app.fetch,
      port,
    },
    (info) => {
      console.log(info.address, info.port);
    }
  );
  injectWebSocket(server);
}
