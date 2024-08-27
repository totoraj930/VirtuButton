import { z } from 'zod';

export const zDiscordTokenRes = z.object({
  access_token: z.string(),
  token_type: z.literal('Bearer'),
  expires_in: z.number().int(),
  refresh_token: z.string(),
  scope: z.string(),
});

export type DiscordTokenRes = z.infer<typeof zDiscordTokenRes>;

export const zDiscordVoiceSettings = z
  .object({
    deaf: z.boolean(),
    mute: z.boolean(),
  })
  .and(z.record(z.string(), z.any()));
export type DiscordVoiceSettings = z.infer<typeof zDiscordVoiceSettings>;
