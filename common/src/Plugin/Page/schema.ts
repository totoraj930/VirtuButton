import { z } from 'zod';
import { zULID } from '../../utils';
import { zButton } from '../Button';
import { zControlButtonInstance } from '../ControlButton';

export const zPageItem = z.union([zControlButtonInstance, zButton]);
export const zPageItemSerialized = z.union([zControlButtonInstance, zButton]);

// ボタンが並ぶページ
export const zPage = z.object({
  id: zULID,
  name: z.string().catch('ページ'),
  w: z.number().int().catch(8),
  h: z.number().int().catch(4),
  items: z.array(zPageItem).catch([]),
});

export const zPageSerialized = zPage.extend({
  items: z.array(zPageItemSerialized),
});

// Page -> Button -> Event -> Action
