import { z } from 'zod';
import { zPluginAction } from './Action/schema';
import { zPluginEvent } from './Event/schema';
import { zControlButton } from './ControlButton';

export const zEmitter = z.function();

/**
 * プラグインをロードするときにパースする用
 */
export const zVirtuButtonPlugin = z.object({
  schemaVersion: z.literal(1),
  id: z.string(),
  name: z.string(),
  description: z.string().catch('説明がありません'),
  init: zEmitter.catch(() => {}),
  events: z.array(zPluginEvent),
  actions: z.array(zPluginAction),
  controlButtons: z.array(zControlButton),
});
