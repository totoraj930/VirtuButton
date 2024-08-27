import { z } from 'zod';

export const DEFAULT_SETTINGS_FILE = 'settings-0.json';
export const zConfig = z.object({
  fileName: z.string().catch(DEFAULT_SETTINGS_FILE),
});
export type Config = z.infer<typeof zConfig>;
