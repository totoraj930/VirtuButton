import { z } from 'zod';
import { zHexColor, zULID } from '../../utils';
import { zPluginFieldValues } from '../Field/schema';

// 主に設定ファイルのパースに使う

export const zButtonTask = z.object({
  id: zULID,
  actionId: z.string(),
  pluginId: z.string(),
  fieldValues: zPluginFieldValues,
});

export const zButtonHandler = z.object({
  id: zULID,
  event: z.object({
    eventId: z.string(),
    pluginId: z.string(),
    fieldValues: zPluginFieldValues,
  }),
  tasks: z.array(zButtonTask),
});

const zMaterialSymbol = z.string();

export const zButtonStyle = z.object({
  text: z.string().catch(''),
  textSize: z.number().min(0).max(1000).step(50).catch(150),
  color: z
    .object({
      background: zHexColor,
      text: zHexColor,
    })
    .catch({ background: '#313131', text: '#ffffff' }),
  image: z.string().optional(),
  icon: zMaterialSymbol.optional(),
  bgOpacity: z.number().min(0).max(1).catch(1),
});

export const zButtonViewProps = z.object({
  x: z.number().catch(0),
  y: z.number().catch(0),
  w: z.number().catch(1),
  h: z.number().catch(1),
  zIndex: z.number().catch(0),
  styleIndex: z.number().catch(0),
  temp: z
    .object({
      title: z.string().optional(),
    })
    .optional(),
});

export const zButton = z.object({
  id: zULID,
  type: z.literal('Button'),
  handlers: z.array(zButtonHandler).catch([]),
  styles: z
    .array(zButtonStyle)
    .min(1)
    .catch([structuredClone(zButtonStyle.parse({}))]),
  viewProps: zButtonViewProps.catch(
    structuredClone(zButtonViewProps.parse({}))
  ),
});

export const zButtonViewPayload = zButton.omit({ handlers: true });
