import {
  zPageItemSerialized,
  zPageSerialized,
} from '@virtu-button/common/Plugin';
import { z } from 'zod';

// server -> client
export const zUpdateItemEvent = z.object({
  name: z.literal('update:item'),
  data: zPageItemSerialized,
});

export const zUpdatePageEvent = z.object({
  name: z.literal('update:pages'),
  data: z.array(zPageSerialized),
});

export const zUpdateViewEvent = z.object({
  name: z.literal('update:view'),
  data: zPageSerialized,
});

export const zToClientEvent = z.union([zUpdateViewEvent, zUpdateItemEvent]);
export type ToClientEvent = z.infer<typeof zToClientEvent>;

// client -> server
// export const zRequestAuthEvent = z.object({
//   name: z.literal('auth'),
//   pass: z.string(),
// });
export const zButtonDownEvent = z.object({
  name: z.literal('button:down'),
  buttonId: z.string(),
});
export const zButtonUpEvent = z.object({
  name: z.literal('button:up'),
  buttonId: z.string(),
});
export const zButtonClickEvent = z.object({
  name: z.literal('button:click'),
  buttonId: z.string(),
});
export const zPageNextEvent = z.object({
  name: z.literal('page:next'),
});
export const zPagePrevEvent = z.object({
  name: z.literal('page:prev'),
});

export const zToServerEvent = z.union([
  zButtonDownEvent,
  zButtonUpEvent,
  zButtonClickEvent,
  zPageNextEvent,
  zPagePrevEvent,
]);
export type ToServerEvent = z.infer<typeof zToServerEvent>;
