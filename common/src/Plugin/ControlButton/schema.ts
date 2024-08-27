import { z } from 'zod';
import { zButton } from '../Button';
import { zPluginFields, zPluginFieldValues } from '../Field';

export const zControlButtonInstance = z.object({
  type: z.literal('ControlButton'),
  id: zButton.shape['id'],
  pluginId: z.string(),
  controlButtonId: z.string(),
  fieldValues: zPluginFieldValues,
  styles: zButton.shape['styles'],
  viewProps: zButton.shape['viewProps'],
});

export const zControlButtonHandler = z
  .function()
  .args(zControlButtonInstance)
  .returns(z.void());

/**
 * プラグインからControlButtonを登録するときに使う
 */
export const zControlButton = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  styles: zButton.shape['styles'],
  onClick: zControlButtonHandler.optional(),
  onDown: zControlButtonHandler.optional(),
  onUp: zControlButtonHandler.optional(),
  onMount: zControlButtonHandler,
  onDestroy: zControlButtonHandler,
  fields: zPluginFields,
});
