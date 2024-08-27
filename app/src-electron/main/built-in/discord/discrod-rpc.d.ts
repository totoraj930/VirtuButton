import { Client } from 'discord-rpc';

declare module 'discord-rpc' {
  interface Client extends Client {
    setVoiceSettings(args: Partial<VoiceSettings>): Promise<any>;
    accessToken: string;
  }
}
