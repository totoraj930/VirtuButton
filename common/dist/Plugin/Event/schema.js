import { z } from 'zod';
import { zPluginFields } from '../Field/schema';
/**
 * プラグインでemittするイベントのスキーマ
 */
export const zPluginEvent = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional(),
    fields: zPluginFields,
});
