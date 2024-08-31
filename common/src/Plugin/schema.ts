import { z } from 'zod';
import { zPluginAction } from './Action/schema';
import { zControlButton } from './ControlButton';
import { zPluginEvent } from './Event/schema';

export const zEmitter = z.function();

/**
 * プラグインをロードするときにパースする用
 */
export const zVirtuButtonPlugin = z.object({
  schemaVersion: z.literal(1),
  id: z.string(),
  name: z.string(),
  version: z.string(),
  description: z.string().catch('説明がありません'),
  init: zEmitter.catch(() => {}),
  events: z.array(zPluginEvent),
  actions: z.array(zPluginAction),
  controlButtons: z.array(zControlButton),
});
