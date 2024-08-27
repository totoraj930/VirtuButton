import { z } from 'zod';
import { zPluginFields } from '../Field/schema';

// 外部からのアクションをパースするためのスキーマ

export const zPluginAction = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  run: z.function(),
  fields: zPluginFields,
});
