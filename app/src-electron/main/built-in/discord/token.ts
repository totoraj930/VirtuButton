import { serve } from '@hono/node-server';
import { VBPluginError } from '@virtu-button/common/Plugin';
import { Client } from 'discord-rpc';
import { shell } from 'electron';
import { Hono } from 'hono';
import { AddressInfo, createServer } from 'net';
import { clientId, clientSecret, scopes } from './api';
import { DiscordTokenRes, zDiscordTokenRes } from './schema';

// 空いているポートを見つける関数
async function findOpenPort(start: number, end: number): Promise<number> {
  return new Promise((resolve, reject) => {
    const tryPort = (port: number) => {
      if (port > end) {
        reject(
          new VBPluginError('No open port found within the specified range')
        );
        return;
      }
      const server = createServer();
      server.unref();
      server.on('error', () => tryPort(port + 1));
      server.listen(port, () => {
        const address = server.address() as AddressInfo;
        server.close(() => resolve(address.port));
      });
    };
    tryPort(start);
  });
}

async function isTokenValid(tokenRes: DiscordTokenRes) {
  const endpoint = 'https://discord.com/api/users/@me';
  const res = await fetch(endpoint, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${tokenRes.access_token}`,
    },
  });
  return res.ok;
}

async function getTokenFromRefreshToken(tokenRes: DiscordTokenRes) {
  const endpoint = 'https://discord.com/api/oauth2/token';
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: tokenRes.refresh_token,
    }),
  });
  const rawJson = await res.json();
  return zDiscordTokenRes.parse(rawJson);
}

export async function getDiscordToken(
  prevTokenRes?: DiscordTokenRes
): Promise<DiscordTokenRes> {
  if (prevTokenRes) {
    if (await isTokenValid(prevTokenRes)) {
      return Promise.resolve(prevTokenRes);
    } else {
      return await getTokenFromRefreshToken(prevTokenRes);
    }
  }

  return new Promise(async (resolve, reject) => {
    // 空いているポートを探す
    const port = await findOpenPort(51031, 51034);

    const app = new Hono();
    app.get('/code', async (c) => {
      const code = c.req.query('code');
      if (!code) {
        reject('Login was cancelled');
        return c.text('Discordへの接続をキャンセルしました');
      }
      const endpoint = 'https://discord.com/api/oauth2/token';
      const body = {
        grant_type: 'authorization_code',
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: `http://localhost:${port}/code`,
      };
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(body as Record<string, string>),
      });
      const rawJson = await res.json();
      const tokenRes = zDiscordTokenRes.parse(rawJson);
      resolve(tokenRes);

      setTimeout(() => {
        server.close();
        console.log('Server closed after successful login');
        clearTimeout(closeTimeout);
      }, 1000);
      return c.text('Discordに接続しました。ウィンドウを閉じてください。');
    });

    // Hono サーバーを起動
    const server = serve({
      fetch: app.fetch,
      port: port,
    });
    const closeTimeout = setTimeout(
      () => {
        server.close();
        reject('Timeout');
        console.log('Server closed due to timeout');
      },
      1000 * 60 * 15
    );

    const urlParams = new URLSearchParams({
      client_id: clientId,
      response_type: 'code',
      redirect_uri: `http://localhost:${port}/code`,
      scope: scopes.join(' '),
    });
    // ブラウザを開いてユーザーにログインをリクエスト
    shell.openExternal(
      `https://discord.com/oauth2/authorize?${urlParams.toString()}`
    );
  });
}

export async function getDiscordTokenFromRPC(): Promise<DiscordTokenRes> {
  const c = new Client({ transport: 'ipc' });
  const res = await c.login({
    clientId,
    clientSecret,
    scopes,
    redirectUri: `http://localhost:51030/discord/`,
  });
  c.destroy()
    .then(() => {})
    .catch(() => {});
  if (res.accessToken) {
    return {
      access_token: res.accessToken,
      refresh_token: '',
      expires_in: 0,
      token_type: 'Bearer',
      scope: scopes.join(' '),
    };
  }
  throw new VBPluginError('Login failed');
}
