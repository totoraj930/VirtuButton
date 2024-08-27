import { z } from 'zod';
export const zFieldBase = z.object({
    name: z.string(),
    description: z.string().optional(),
    disabled: z.boolean().optional(),
});
export const zStringField = zFieldBase.extend({
    type: z.literal('string'),
    default: z.string(),
    placeholder: z.string().optional(),
});
export const zTextField = zFieldBase.extend({
    type: z.literal('text'),
    default: z.string(),
    placeholder: z.string().optional(),
});
export const zNumberField = zFieldBase.extend({
    type: z.literal('number'),
    default: z.number(),
    min: z.number().optional(),
    max: z.number().optional(),
    step: z.number().optional(),
    placeholder: z.string().optional(),
});
export const zBooleanField = zFieldBase.extend({
    type: z.literal('boolean'),
    default: z.boolean(),
});
export const zSelectOptionK = z.object({
    key: z.string(),
    name: z.string(),
});
export const zSelectOptionGroup = z.object({
    type: z.literal('group'),
    name: z.string(),
});
export const zSelectOptionHr = z.object({
    type: z.literal('hr'),
});
export const zSelectOption = z.union([
    zSelectOptionK,
    zSelectOptionGroup,
    zSelectOptionHr,
]);
export const zSelectField = zFieldBase.extend({
    type: z.literal('select'),
    options: z.array(zSelectOption),
    default: z.string(),
});
export const zKeyCombinationField = zFieldBase.extend({
    type: z.literal('keyCombination'),
    default: z.array(z.string()),
    placeholder: z.string().optional(),
});
export const zPluginField = z.union([
    zTextField,
    zStringField,
    zNumberField,
    zBooleanField,
    zSelectField,
    zKeyCombinationField,
]);
export const zPluginStaticFields = z.record(z.string(), zPluginField);
export const zPluginDynamicFields = z
    .function()
    .returns(z.union([zPluginStaticFields, z.promise(zPluginStaticFields)]));
export const zPluginFields = z.union([
    zPluginStaticFields,
    zPluginDynamicFields,
]);
const zPluginFieldValue = z.union([
    zTextField.shape['default'],
    zStringField.shape['default'],
    zNumberField.shape['default'],
    zBooleanField.shape['default'],
    zSelectField.shape['default'],
    zKeyCombinationField.shape['default'],
]);
export const zPluginFieldValues = z.record(z.string(), zPluginFieldValue);
