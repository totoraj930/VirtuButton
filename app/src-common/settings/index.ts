import { zPage } from '@virtu-button/common/Plugin';
import { z } from 'zod';

// ウィンドウの場所
export const zWindowPos = z.object({
  x: z.number().catch(0),
  y: z.number().catch(0),
  w: z.number().catch(600),
  h: z.number().catch(400),
  isShow: z.boolean().catch(true),
  isMaximized: z.boolean().catch(false),
});

// サーバーの設定
export const zServer = z.object({
  port: z.number().catch(51030),
  auth: z.string().nullable().catch(null),
});

// 設定ファイル本体
export const zSettings = z.object({
  schemaVersion: z.literal(1),
  windowPos: zWindowPos.catch(zWindowPos.parse({})),
  server: zServer.catch(zServer.parse({})),
  openAtLogin: z.boolean().catch(false),
  pageIndex: z.number().catch(0),
  pages: z
    .array(zPage)
    .min(1)
    .catch([zPage.parse({})]),
});
export type Settings = z.infer<typeof zSettings>;
