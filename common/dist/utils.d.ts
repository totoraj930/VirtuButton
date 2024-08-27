import { z } from 'zod';
export declare const zULID: z.ZodCatch<z.ZodString>;
export declare const zStrToNum: z.ZodEffects<z.ZodEffects<z.ZodString, number, string>, number, string>;
export declare const zHexColor: z.ZodString;
