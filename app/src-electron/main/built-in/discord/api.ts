import { VBPluginError } from '@virtu-button/common/Plugin';
import DiscrodRPC, { Client } from 'discord-rpc';
import fs from 'node:fs';
import { z } from 'zod';
import { onEvent } from '.';
import {
  DiscordTokenRes,
  zDiscordTokenRes,
  zDiscordVoiceSettings,
} from './schema';
import { getDiscordTokenFromRPC } from './token';
export const clientId = import.meta.env.VITE_DISCORD_CLIENT_ID;
export const clientSecret = import.meta.env.VITE_DISCORD_CLIENT_SECRET;
export const scopes = ['rpc'];

DiscrodRPC.register(clientId);

const zConfig = z.object({
  token: z.string().nullable(),
});
type DiscordConfig = z.infer<typeof zConfig>;

type VoiceSettings = {
  mute: boolean;
  deaf: boolean;
  automaticGainControl: boolean;
  echoCancellation: boolean;
  noiseSuppression: boolean;
  qos: boolean;
  silenceWarning: boolean;
};

export class DiscordApi {
  #configFile: string;
  #isActive: boolean = false;
  // #token: string | null = null;
  #client: Client | null = null;
  #tokenRes: DiscordTokenRes | null = null;

  constructor(configFilePath: string) {
    this.#configFile = configFilePath;
    this.loadConfig();
  }
  get token(): string | null {
    return this.#tokenRes?.access_token ?? null;
  }
  get isActive() {
    return this.#isActive;
  }

  private loadConfig() {
    console.log('loadConfig');
    // let config: DiscordConfig | undefined;
    let tokenRes: DiscordTokenRes | null = null;
    try {
      const rawConfig = fs.readFileSync(this.#configFile, {
        encoding: 'utf-8',
      });
      // config = zConfig.parse(JSON.parse(rawConfig));
      tokenRes = zDiscordTokenRes.parse(JSON.parse(rawConfig));
    } catch (e) {
      console.log(e);
      // config = { token: null };
      tokenRes = null;
    }
    // this.#token = config.token;
    this.#tokenRes = tokenRes;
    this.saveConfig();
  }

  private saveConfig() {
    console.log('saveConfig');
    // const config: DiscordConfig = {
    //   token: this.#token,
    // };
    fs.writeFileSync(
      this.#configFile,
      JSON.stringify(this.#tokenRes, null, '  '),
      {
        encoding: 'utf-8',
      }
    );
  }

  public async toggleMic(direction?: 'on' | 'off') {
    console.log('toggleMic');
    await this.updateIsActive();
    if (!this.#isActive) {
      await this.login();
    }
    if (!this.#client) {
      throw new VBPluginError('Discord Login Error');
    }
    const { mute, deaf } = await this.getVoiceSettings(this.#client);
    const newMute = deaf
      ? false
      : !direction
        ? !mute
        : direction === 'off'
          ? true
          : false;
    await this.#client.setVoiceSettings({ mute: newMute });
  }

  public async toggleSpeaker(direction?: 'on' | 'off') {
    console.log('toggleSpeaker');
    await this.updateIsActive();
    if (!this.#isActive) {
      await this.login();
    }
    if (!this.#client) {
      throw new VBPluginError('Discord Login Error');
    }
    const { deaf } = await this.getVoiceSettings(this.#client);
    const newDeaf = !direction ? !deaf : direction === 'off' ? true : false;
    await this.#client.setVoiceSettings({
      deaf: newDeaf,
    });
  }

  private async updateIsActive() {
    console.log('updateIsActive');
    if (!this.#client) {
      console.log('client not found');
      this.#isActive = false;
      return;
    }
    try {
      await this.getVoiceSettings(this.#client);
      this.#isActive = true;
    } catch (e) {
      console.log(e);
      this.#isActive = false;
      this.#client = null;
    }
  }

  private async getVoiceSettings(client: Client): Promise<VoiceSettings> {
    console.log('getVoiceSettings');
    return new Promise(async (resolve, reject) => {
      const timer = setTimeout(() => {
        reject();
        console.log('timeout');
      }, 500);
      const {
        mute,
        deaf,
        automaticGainControl,
        echoCancellation,
        noiseSuppression,
        qos,
        silenceWarning,
      } = await client.getVoiceSettings();
      clearTimeout(timer);
      resolve({
        mute,
        deaf,
        automaticGainControl,
        echoCancellation,
        noiseSuppression,
        qos,
        silenceWarning,
      });
    });
  }

  private async getTokenRes(): Promise<DiscordTokenRes | null> {
    try {
      // return await getDiscordToken(this.#tokenRes ?? undefined);
      return await getDiscordTokenFromRPC();
    } catch {
      return null;
    }
  }

  public async login() {
    console.log('login');
    if (!this.token) {
      const newTokenRes = await this.getTokenRes();
      console.log(newTokenRes);
      if (!newTokenRes) return;
      this.#tokenRes = newTokenRes;
      this.saveConfig();
    }
    await this.clientInit();
  }

  private async clientInit() {
    console.log('clientInit');
    if (!this.token) return;
    const c = new Client({ transport: 'ipc' });
    c.on('ready', async () => {
      this.#isActive = true;
      console.log('Discrod User:', c.user?.username);
      c.subscribe('VOICE_SETTINGS_UPDATE', {});
      c.on('VOICE_SETTINGS_UPDATE', (rawData) => {
        try {
          const voiceSettings = zDiscordVoiceSettings.parse(rawData);
          onEvent(voiceSettings.deaf ? 'speaker-off' : 'speaker-on');
          if (voiceSettings.deaf) {
            onEvent('mic-off');
          } else {
            onEvent(voiceSettings.mute ? 'mic-off' : 'mic-on');
          }
        } catch {}
      });
    });
    try {
      await c.login({
        clientId,
        accessToken: this.token,
        scopes,
      });
      this.#client = c;
    } catch (e) {
      c.destroy()
        .then(() => {
          console.log('client destroy');
        })
        .catch(() => {
          console.log('destroy error');
        });
      console.log(e);
      if (e instanceof Error) {
        if (e.message.includes(this.token)) {
          console.log('Discord Token Error');
          // token error
          this.#tokenRes = null;
        } else {
          console.log('Discord is not running error');
        }
      }
    }
  }
}
