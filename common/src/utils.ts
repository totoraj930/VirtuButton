import { ulid } from 'ulid';
import { z } from 'zod';

export const zULID = z.string().catch(ulid());

export const zStrToNum = z
  .string()
  .transform((val) => Number.parseFloat(val))
  .refine((val) => !Number.isFinite(val));

export const zHexColor = z.string().regex(/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/);