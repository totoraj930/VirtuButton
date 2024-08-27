import { z } from 'zod';
export declare const zFieldBase: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    disabled: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    name: string;
    disabled?: boolean | undefined;
    description?: string | undefined;
}, {
    name: string;
    disabled?: boolean | undefined;
    description?: string | undefined;
}>;
export declare const zStringField: z.ZodObject<z.objectUtil.extendShape<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    disabled: z.ZodOptional<z.ZodBoolean>;
}, {
    type: z.ZodLiteral<"string">;
    default: z.ZodString;
    placeholder: z.ZodOptional<z.ZodString>;
}>, "strip", z.ZodTypeAny, {
    name: string;
    type: "string";
    default: string;
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
}, {
    name: string;
    type: "string";
    default: string;
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
}>;
export declare const zTextField: z.ZodObject<z.objectUtil.extendShape<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    disabled: z.ZodOptional<z.ZodBoolean>;
}, {
    type: z.ZodLiteral<"text">;
    default: z.ZodString;
    placeholder: z.ZodOptional<z.ZodString>;
}>, "strip", z.ZodTypeAny, {
    name: string;
    type: "text";
    default: string;
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
}, {
    name: string;
    type: "text";
    default: string;
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
}>;
export declare const zNumberField: z.ZodObject<z.objectUtil.extendShape<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    disabled: z.ZodOptional<z.ZodBoolean>;
}, {
    type: z.ZodLiteral<"number">;
    default: z.ZodNumber;
    min: z.ZodOptional<z.ZodNumber>;
    max: z.ZodOptional<z.ZodNumber>;
    step: z.ZodOptional<z.ZodNumber>;
    placeholder: z.ZodOptional<z.ZodString>;
}>, "strip", z.ZodTypeAny, {
    name: string;
    type: "number";
    default: number;
    max?: number | undefined;
    min?: number | undefined;
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
    step?: number | undefined;
}, {
    name: string;
    type: "number";
    default: number;
    max?: number | undefined;
    min?: number | undefined;
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
    step?: number | undefined;
}>;
export declare const zBooleanField: z.ZodObject<z.objectUtil.extendShape<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    disabled: z.ZodOptional<z.ZodBoolean>;
}, {
    type: z.ZodLiteral<"boolean">;
    default: z.ZodBoolean;
}>, "strip", z.ZodTypeAny, {
    name: string;
    type: "boolean";
    default: boolean;
    disabled?: boolean | undefined;
    description?: string | undefined;
}, {
    name: string;
    type: "boolean";
    default: boolean;
    disabled?: boolean | undefined;
    description?: string | undefined;
}>;
export declare const zSelectOptionK: z.ZodObject<{
    key: z.ZodString;
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    key: string;
}, {
    name: string;
    key: string;
}>;
export declare const zSelectOptionGroup: z.ZodObject<{
    type: z.ZodLiteral<"group">;
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "group";
}, {
    name: string;
    type: "group";
}>;
export declare const zSelectOptionHr: z.ZodObject<{
    type: z.ZodLiteral<"hr">;
}, "strip", z.ZodTypeAny, {
    type: "hr";
}, {
    type: "hr";
}>;
export declare const zSelectOption: z.ZodUnion<[z.ZodObject<{
    key: z.ZodString;
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    key: string;
}, {
    name: string;
    key: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<"group">;
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "group";
}, {
    name: string;
    type: "group";
}>, z.ZodObject<{
    type: z.ZodLiteral<"hr">;
}, "strip", z.ZodTypeAny, {
    type: "hr";
}, {
    type: "hr";
}>]>;
export declare const zSelectField: z.ZodObject<z.objectUtil.extendShape<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    disabled: z.ZodOptional<z.ZodBoolean>;
}, {
    type: z.ZodLiteral<"select">;
    options: z.ZodArray<z.ZodUnion<[z.ZodObject<{
        key: z.ZodString;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        key: string;
    }, {
        name: string;
        key: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"group">;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        type: "group";
    }, {
        name: string;
        type: "group";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"hr">;
    }, "strip", z.ZodTypeAny, {
        type: "hr";
    }, {
        type: "hr";
    }>]>, "many">;
    default: z.ZodString;
}>, "strip", z.ZodTypeAny, {
    name: string;
    type: "select";
    default: string;
    options: ({
        name: string;
        key: string;
    } | {
        name: string;
        type: "group";
    } | {
        type: "hr";
    })[];
    disabled?: boolean | undefined;
    description?: string | undefined;
}, {
    name: string;
    type: "select";
    default: string;
    options: ({
        name: string;
        key: string;
    } | {
        name: string;
        type: "group";
    } | {
        type: "hr";
    })[];
    disabled?: boolean | undefined;
    description?: string | undefined;
}>;
export declare const zKeyCombinationField: z.ZodObject<z.objectUtil.extendShape<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    disabled: z.ZodOptional<z.ZodBoolean>;
}, {
    type: z.ZodLiteral<"keyCombination">;
    default: z.ZodArray<z.ZodString, "many">;
    placeholder: z.ZodOptional<z.ZodString>;
}>, "strip", z.ZodTypeAny, {
    name: string;
    type: "keyCombination";
    default: string[];
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
}, {
    name: string;
    type: "keyCombination";
    default: string[];
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
}>;
export declare const zPluginField: z.ZodUnion<[z.ZodObject<z.objectUtil.extendShape<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    disabled: z.ZodOptional<z.ZodBoolean>;
}, {
    type: z.ZodLiteral<"text">;
    default: z.ZodString;
    placeholder: z.ZodOptional<z.ZodString>;
}>, "strip", z.ZodTypeAny, {
    name: string;
    type: "text";
    default: string;
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
}, {
    name: string;
    type: "text";
    default: string;
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
}>, z.ZodObject<z.objectUtil.extendShape<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    disabled: z.ZodOptional<z.ZodBoolean>;
}, {
    type: z.ZodLiteral<"string">;
    default: z.ZodString;
    placeholder: z.ZodOptional<z.ZodString>;
}>, "strip", z.ZodTypeAny, {
    name: string;
    type: "string";
    default: string;
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
}, {
    name: string;
    type: "string";
    default: string;
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
}>, z.ZodObject<z.objectUtil.extendShape<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    disabled: z.ZodOptional<z.ZodBoolean>;
}, {
    type: z.ZodLiteral<"number">;
    default: z.ZodNumber;
    min: z.ZodOptional<z.ZodNumber>;
    max: z.ZodOptional<z.ZodNumber>;
    step: z.ZodOptional<z.ZodNumber>;
    placeholder: z.ZodOptional<z.ZodString>;
}>, "strip", z.ZodTypeAny, {
    name: string;
    type: "number";
    default: number;
    max?: number | undefined;
    min?: number | undefined;
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
    step?: number | undefined;
}, {
    name: string;
    type: "number";
    default: number;
    max?: number | undefined;
    min?: number | undefined;
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
    step?: number | undefined;
}>, z.ZodObject<z.objectUtil.extendShape<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    disabled: z.ZodOptional<z.ZodBoolean>;
}, {
    type: z.ZodLiteral<"boolean">;
    default: z.ZodBoolean;
}>, "strip", z.ZodTypeAny, {
    name: string;
    type: "boolean";
    default: boolean;
    disabled?: boolean | undefined;
    description?: string | undefined;
}, {
    name: string;
    type: "boolean";
    default: boolean;
    disabled?: boolean | undefined;
    description?: string | undefined;
}>, z.ZodObject<z.objectUtil.extendShape<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    disabled: z.ZodOptional<z.ZodBoolean>;
}, {
    type: z.ZodLiteral<"select">;
    options: z.ZodArray<z.ZodUnion<[z.ZodObject<{
        key: z.ZodString;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        key: string;
    }, {
        name: string;
        key: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"group">;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        type: "group";
    }, {
        name: string;
        type: "group";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"hr">;
    }, "strip", z.ZodTypeAny, {
        type: "hr";
    }, {
        type: "hr";
    }>]>, "many">;
    default: z.ZodString;
}>, "strip", z.ZodTypeAny, {
    name: string;
    type: "select";
    default: string;
    options: ({
        name: string;
        key: string;
    } | {
        name: string;
        type: "group";
    } | {
        type: "hr";
    })[];
    disabled?: boolean | undefined;
    description?: string | undefined;
}, {
    name: string;
    type: "select";
    default: string;
    options: ({
        name: string;
        key: string;
    } | {
        name: string;
        type: "group";
    } | {
        type: "hr";
    })[];
    disabled?: boolean | undefined;
    description?: string | undefined;
}>, z.ZodObject<z.objectUtil.extendShape<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    disabled: z.ZodOptional<z.ZodBoolean>;
}, {
    type: z.ZodLiteral<"keyCombination">;
    default: z.ZodArray<z.ZodString, "many">;
    placeholder: z.ZodOptional<z.ZodString>;
}>, "strip", z.ZodTypeAny, {
    name: string;
    type: "keyCombination";
    default: string[];
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
}, {
    name: string;
    type: "keyCombination";
    default: string[];
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
}>]>;
export declare const zPluginStaticFields: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<z.objectUtil.extendShape<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    disabled: z.ZodOptional<z.ZodBoolean>;
}, {
    type: z.ZodLiteral<"text">;
    default: z.ZodString;
    placeholder: z.ZodOptional<z.ZodString>;
}>, "strip", z.ZodTypeAny, {
    name: string;
    type: "text";
    default: string;
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
}, {
    name: string;
    type: "text";
    default: string;
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
}>, z.ZodObject<z.objectUtil.extendShape<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    disabled: z.ZodOptional<z.ZodBoolean>;
}, {
    type: z.ZodLiteral<"string">;
    default: z.ZodString;
    placeholder: z.ZodOptional<z.ZodString>;
}>, "strip", z.ZodTypeAny, {
    name: string;
    type: "string";
    default: string;
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
}, {
    name: string;
    type: "string";
    default: string;
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
}>, z.ZodObject<z.objectUtil.extendShape<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    disabled: z.ZodOptional<z.ZodBoolean>;
}, {
    type: z.ZodLiteral<"number">;
    default: z.ZodNumber;
    min: z.ZodOptional<z.ZodNumber>;
    max: z.ZodOptional<z.ZodNumber>;
    step: z.ZodOptional<z.ZodNumber>;
    placeholder: z.ZodOptional<z.ZodString>;
}>, "strip", z.ZodTypeAny, {
    name: string;
    type: "number";
    default: number;
    max?: number | undefined;
    min?: number | undefined;
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
    step?: number | undefined;
}, {
    name: string;
    type: "number";
    default: number;
    max?: number | undefined;
    min?: number | undefined;
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
    step?: number | undefined;
}>, z.ZodObject<z.objectUtil.extendShape<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    disabled: z.ZodOptional<z.ZodBoolean>;
}, {
    type: z.ZodLiteral<"boolean">;
    default: z.ZodBoolean;
}>, "strip", z.ZodTypeAny, {
    name: string;
    type: "boolean";
    default: boolean;
    disabled?: boolean | undefined;
    description?: string | undefined;
}, {
    name: string;
    type: "boolean";
    default: boolean;
    disabled?: boolean | undefined;
    description?: string | undefined;
}>, z.ZodObject<z.objectUtil.extendShape<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    disabled: z.ZodOptional<z.ZodBoolean>;
}, {
    type: z.ZodLiteral<"select">;
    options: z.ZodArray<z.ZodUnion<[z.ZodObject<{
        key: z.ZodString;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        key: string;
    }, {
        name: string;
        key: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"group">;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        type: "group";
    }, {
        name: string;
        type: "group";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"hr">;
    }, "strip", z.ZodTypeAny, {
        type: "hr";
    }, {
        type: "hr";
    }>]>, "many">;
    default: z.ZodString;
}>, "strip", z.ZodTypeAny, {
    name: string;
    type: "select";
    default: string;
    options: ({
        name: string;
        key: string;
    } | {
        name: string;
        type: "group";
    } | {
        type: "hr";
    })[];
    disabled?: boolean | undefined;
    description?: string | undefined;
}, {
    name: string;
    type: "select";
    default: string;
    options: ({
        name: string;
        key: string;
    } | {
        name: string;
        type: "group";
    } | {
        type: "hr";
    })[];
    disabled?: boolean | undefined;
    description?: string | undefined;
}>, z.ZodObject<z.objectUtil.extendShape<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    disabled: z.ZodOptional<z.ZodBoolean>;
}, {
    type: z.ZodLiteral<"keyCombination">;
    default: z.ZodArray<z.ZodString, "many">;
    placeholder: z.ZodOptional<z.ZodString>;
}>, "strip", z.ZodTypeAny, {
    name: string;
    type: "keyCombination";
    default: string[];
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
}, {
    name: string;
    type: "keyCombination";
    default: string[];
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
}>]>>;
export declare const zPluginDynamicFields: z.ZodFunction<z.ZodTuple<[], z.ZodUnknown>, z.ZodUnion<[z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<z.objectUtil.extendShape<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    disabled: z.ZodOptional<z.ZodBoolean>;
}, {
    type: z.ZodLiteral<"text">;
    default: z.ZodString;
    placeholder: z.ZodOptional<z.ZodString>;
}>, "strip", z.ZodTypeAny, {
    name: string;
    type: "text";
    default: string;
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
}, {
    name: string;
    type: "text";
    default: string;
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
}>, z.ZodObject<z.objectUtil.extendShape<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    disabled: z.ZodOptional<z.ZodBoolean>;
}, {
    type: z.ZodLiteral<"string">;
    default: z.ZodString;
    placeholder: z.ZodOptional<z.ZodString>;
}>, "strip", z.ZodTypeAny, {
    name: string;
    type: "string";
    default: string;
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
}, {
    name: string;
    type: "string";
    default: string;
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
}>, z.ZodObject<z.objectUtil.extendShape<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    disabled: z.ZodOptional<z.ZodBoolean>;
}, {
    type: z.ZodLiteral<"number">;
    default: z.ZodNumber;
    min: z.ZodOptional<z.ZodNumber>;
    max: z.ZodOptional<z.ZodNumber>;
    step: z.ZodOptional<z.ZodNumber>;
    placeholder: z.ZodOptional<z.ZodString>;
}>, "strip", z.ZodTypeAny, {
    name: string;
    type: "number";
    default: number;
    max?: number | undefined;
    min?: number | undefined;
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
    step?: number | undefined;
}, {
    name: string;
    type: "number";
    default: number;
    max?: number | undefined;
    min?: number | undefined;
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
    step?: number | undefined;
}>, z.ZodObject<z.objectUtil.extendShape<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    disabled: z.ZodOptional<z.ZodBoolean>;
}, {
    type: z.ZodLiteral<"boolean">;
    default: z.ZodBoolean;
}>, "strip", z.ZodTypeAny, {
    name: string;
    type: "boolean";
    default: boolean;
    disabled?: boolean | undefined;
    description?: string | undefined;
}, {
    name: string;
    type: "boolean";
    default: boolean;
    disabled?: boolean | undefined;
    description?: string | undefined;
}>, z.ZodObject<z.objectUtil.extendShape<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    disabled: z.ZodOptional<z.ZodBoolean>;
}, {
    type: z.ZodLiteral<"select">;
    options: z.ZodArray<z.ZodUnion<[z.ZodObject<{
        key: z.ZodString;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        key: string;
    }, {
        name: string;
        key: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"group">;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        type: "group";
    }, {
        name: string;
        type: "group";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"hr">;
    }, "strip", z.ZodTypeAny, {
        type: "hr";
    }, {
        type: "hr";
    }>]>, "many">;
    default: z.ZodString;
}>, "strip", z.ZodTypeAny, {
    name: string;
    type: "select";
    default: string;
    options: ({
        name: string;
        key: string;
    } | {
        name: string;
        type: "group";
    } | {
        type: "hr";
    })[];
    disabled?: boolean | undefined;
    description?: string | undefined;
}, {
    name: string;
    type: "select";
    default: string;
    options: ({
        name: string;
        key: string;
    } | {
        name: string;
        type: "group";
    } | {
        type: "hr";
    })[];
    disabled?: boolean | undefined;
    description?: string | undefined;
}>, z.ZodObject<z.objectUtil.extendShape<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    disabled: z.ZodOptional<z.ZodBoolean>;
}, {
    type: z.ZodLiteral<"keyCombination">;
    default: z.ZodArray<z.ZodString, "many">;
    placeholder: z.ZodOptional<z.ZodString>;
}>, "strip", z.ZodTypeAny, {
    name: string;
    type: "keyCombination";
    default: string[];
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
}, {
    name: string;
    type: "keyCombination";
    default: string[];
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
}>]>>, z.ZodPromise<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<z.objectUtil.extendShape<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    disabled: z.ZodOptional<z.ZodBoolean>;
}, {
    type: z.ZodLiteral<"text">;
    default: z.ZodString;
    placeholder: z.ZodOptional<z.ZodString>;
}>, "strip", z.ZodTypeAny, {
    name: string;
    type: "text";
    default: string;
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
}, {
    name: string;
    type: "text";
    default: string;
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
}>, z.ZodObject<z.objectUtil.extendShape<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    disabled: z.ZodOptional<z.ZodBoolean>;
}, {
    type: z.ZodLiteral<"string">;
    default: z.ZodString;
    placeholder: z.ZodOptional<z.ZodString>;
}>, "strip", z.ZodTypeAny, {
    name: string;
    type: "string";
    default: string;
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
}, {
    name: string;
    type: "string";
    default: string;
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
}>, z.ZodObject<z.objectUtil.extendShape<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    disabled: z.ZodOptional<z.ZodBoolean>;
}, {
    type: z.ZodLiteral<"number">;
    default: z.ZodNumber;
    min: z.ZodOptional<z.ZodNumber>;
    max: z.ZodOptional<z.ZodNumber>;
    step: z.ZodOptional<z.ZodNumber>;
    placeholder: z.ZodOptional<z.ZodString>;
}>, "strip", z.ZodTypeAny, {
    name: string;
    type: "number";
    default: number;
    max?: number | undefined;
    min?: number | undefined;
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
    step?: number | undefined;
}, {
    name: string;
    type: "number";
    default: number;
    max?: number | undefined;
    min?: number | undefined;
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
    step?: number | undefined;
}>, z.ZodObject<z.objectUtil.extendShape<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    disabled: z.ZodOptional<z.ZodBoolean>;
}, {
    type: z.ZodLiteral<"boolean">;
    default: z.ZodBoolean;
}>, "strip", z.ZodTypeAny, {
    name: string;
    type: "boolean";
    default: boolean;
    disabled?: boolean | undefined;
    description?: string | undefined;
}, {
    name: string;
    type: "boolean";
    default: boolean;
    disabled?: boolean | undefined;
    description?: string | undefined;
}>, z.ZodObject<z.objectUtil.extendShape<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    disabled: z.ZodOptional<z.ZodBoolean>;
}, {
    type: z.ZodLiteral<"select">;
    options: z.ZodArray<z.ZodUnion<[z.ZodObject<{
        key: z.ZodString;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        key: string;
    }, {
        name: string;
        key: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"group">;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        type: "group";
    }, {
        name: string;
        type: "group";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"hr">;
    }, "strip", z.ZodTypeAny, {
        type: "hr";
    }, {
        type: "hr";
    }>]>, "many">;
    default: z.ZodString;
}>, "strip", z.ZodTypeAny, {
    name: string;
    type: "select";
    default: string;
    options: ({
        name: string;
        key: string;
    } | {
        name: string;
        type: "group";
    } | {
        type: "hr";
    })[];
    disabled?: boolean | undefined;
    description?: string | undefined;
}, {
    name: string;
    type: "select";
    default: string;
    options: ({
        name: string;
        key: string;
    } | {
        name: string;
        type: "group";
    } | {
        type: "hr";
    })[];
    disabled?: boolean | undefined;
    description?: string | undefined;
}>, z.ZodObject<z.objectUtil.extendShape<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    disabled: z.ZodOptional<z.ZodBoolean>;
}, {
    type: z.ZodLiteral<"keyCombination">;
    default: z.ZodArray<z.ZodString, "many">;
    placeholder: z.ZodOptional<z.ZodString>;
}>, "strip", z.ZodTypeAny, {
    name: string;
    type: "keyCombination";
    default: string[];
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
}, {
    name: string;
    type: "keyCombination";
    default: string[];
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
}>]>>>]>>;
export declare const zPluginFields: z.ZodUnion<[z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<z.objectUtil.extendShape<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    disabled: z.ZodOptional<z.ZodBoolean>;
}, {
    type: z.ZodLiteral<"text">;
    default: z.ZodString;
    placeholder: z.ZodOptional<z.ZodString>;
}>, "strip", z.ZodTypeAny, {
    name: string;
    type: "text";
    default: string;
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
}, {
    name: string;
    type: "text";
    default: string;
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
}>, z.ZodObject<z.objectUtil.extendShape<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    disabled: z.ZodOptional<z.ZodBoolean>;
}, {
    type: z.ZodLiteral<"string">;
    default: z.ZodString;
    placeholder: z.ZodOptional<z.ZodString>;
}>, "strip", z.ZodTypeAny, {
    name: string;
    type: "string";
    default: string;
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
}, {
    name: string;
    type: "string";
    default: string;
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
}>, z.ZodObject<z.objectUtil.extendShape<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    disabled: z.ZodOptional<z.ZodBoolean>;
}, {
    type: z.ZodLiteral<"number">;
    default: z.ZodNumber;
    min: z.ZodOptional<z.ZodNumber>;
    max: z.ZodOptional<z.ZodNumber>;
    step: z.ZodOptional<z.ZodNumber>;
    placeholder: z.ZodOptional<z.ZodString>;
}>, "strip", z.ZodTypeAny, {
    name: string;
    type: "number";
    default: number;
    max?: number | undefined;
    min?: number | undefined;
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
    step?: number | undefined;
}, {
    name: string;
    type: "number";
    default: number;
    max?: number | undefined;
    min?: number | undefined;
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
    step?: number | undefined;
}>, z.ZodObject<z.objectUtil.extendShape<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    disabled: z.ZodOptional<z.ZodBoolean>;
}, {
    type: z.ZodLiteral<"boolean">;
    default: z.ZodBoolean;
}>, "strip", z.ZodTypeAny, {
    name: string;
    type: "boolean";
    default: boolean;
    disabled?: boolean | undefined;
    description?: string | undefined;
}, {
    name: string;
    type: "boolean";
    default: boolean;
    disabled?: boolean | undefined;
    description?: string | undefined;
}>, z.ZodObject<z.objectUtil.extendShape<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    disabled: z.ZodOptional<z.ZodBoolean>;
}, {
    type: z.ZodLiteral<"select">;
    options: z.ZodArray<z.ZodUnion<[z.ZodObject<{
        key: z.ZodString;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        key: string;
    }, {
        name: string;
        key: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"group">;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        type: "group";
    }, {
        name: string;
        type: "group";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"hr">;
    }, "strip", z.ZodTypeAny, {
        type: "hr";
    }, {
        type: "hr";
    }>]>, "many">;
    default: z.ZodString;
}>, "strip", z.ZodTypeAny, {
    name: string;
    type: "select";
    default: string;
    options: ({
        name: string;
        key: string;
    } | {
        name: string;
        type: "group";
    } | {
        type: "hr";
    })[];
    disabled?: boolean | undefined;
    description?: string | undefined;
}, {
    name: string;
    type: "select";
    default: string;
    options: ({
        name: string;
        key: string;
    } | {
        name: string;
        type: "group";
    } | {
        type: "hr";
    })[];
    disabled?: boolean | undefined;
    description?: string | undefined;
}>, z.ZodObject<z.objectUtil.extendShape<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    disabled: z.ZodOptional<z.ZodBoolean>;
}, {
    type: z.ZodLiteral<"keyCombination">;
    default: z.ZodArray<z.ZodString, "many">;
    placeholder: z.ZodOptional<z.ZodString>;
}>, "strip", z.ZodTypeAny, {
    name: string;
    type: "keyCombination";
    default: string[];
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
}, {
    name: string;
    type: "keyCombination";
    default: string[];
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
}>]>>, z.ZodFunction<z.ZodTuple<[], z.ZodUnknown>, z.ZodUnion<[z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<z.objectUtil.extendShape<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    disabled: z.ZodOptional<z.ZodBoolean>;
}, {
    type: z.ZodLiteral<"text">;
    default: z.ZodString;
    placeholder: z.ZodOptional<z.ZodString>;
}>, "strip", z.ZodTypeAny, {
    name: string;
    type: "text";
    default: string;
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
}, {
    name: string;
    type: "text";
    default: string;
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
}>, z.ZodObject<z.objectUtil.extendShape<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    disabled: z.ZodOptional<z.ZodBoolean>;
}, {
    type: z.ZodLiteral<"string">;
    default: z.ZodString;
    placeholder: z.ZodOptional<z.ZodString>;
}>, "strip", z.ZodTypeAny, {
    name: string;
    type: "string";
    default: string;
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
}, {
    name: string;
    type: "string";
    default: string;
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
}>, z.ZodObject<z.objectUtil.extendShape<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    disabled: z.ZodOptional<z.ZodBoolean>;
}, {
    type: z.ZodLiteral<"number">;
    default: z.ZodNumber;
    min: z.ZodOptional<z.ZodNumber>;
    max: z.ZodOptional<z.ZodNumber>;
    step: z.ZodOptional<z.ZodNumber>;
    placeholder: z.ZodOptional<z.ZodString>;
}>, "strip", z.ZodTypeAny, {
    name: string;
    type: "number";
    default: number;
    max?: number | undefined;
    min?: number | undefined;
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
    step?: number | undefined;
}, {
    name: string;
    type: "number";
    default: number;
    max?: number | undefined;
    min?: number | undefined;
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
    step?: number | undefined;
}>, z.ZodObject<z.objectUtil.extendShape<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    disabled: z.ZodOptional<z.ZodBoolean>;
}, {
    type: z.ZodLiteral<"boolean">;
    default: z.ZodBoolean;
}>, "strip", z.ZodTypeAny, {
    name: string;
    type: "boolean";
    default: boolean;
    disabled?: boolean | undefined;
    description?: string | undefined;
}, {
    name: string;
    type: "boolean";
    default: boolean;
    disabled?: boolean | undefined;
    description?: string | undefined;
}>, z.ZodObject<z.objectUtil.extendShape<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    disabled: z.ZodOptional<z.ZodBoolean>;
}, {
    type: z.ZodLiteral<"select">;
    options: z.ZodArray<z.ZodUnion<[z.ZodObject<{
        key: z.ZodString;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        key: string;
    }, {
        name: string;
        key: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"group">;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        type: "group";
    }, {
        name: string;
        type: "group";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"hr">;
    }, "strip", z.ZodTypeAny, {
        type: "hr";
    }, {
        type: "hr";
    }>]>, "many">;
    default: z.ZodString;
}>, "strip", z.ZodTypeAny, {
    name: string;
    type: "select";
    default: string;
    options: ({
        name: string;
        key: string;
    } | {
        name: string;
        type: "group";
    } | {
        type: "hr";
    })[];
    disabled?: boolean | undefined;
    description?: string | undefined;
}, {
    name: string;
    type: "select";
    default: string;
    options: ({
        name: string;
        key: string;
    } | {
        name: string;
        type: "group";
    } | {
        type: "hr";
    })[];
    disabled?: boolean | undefined;
    description?: string | undefined;
}>, z.ZodObject<z.objectUtil.extendShape<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    disabled: z.ZodOptional<z.ZodBoolean>;
}, {
    type: z.ZodLiteral<"keyCombination">;
    default: z.ZodArray<z.ZodString, "many">;
    placeholder: z.ZodOptional<z.ZodString>;
}>, "strip", z.ZodTypeAny, {
    name: string;
    type: "keyCombination";
    default: string[];
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
}, {
    name: string;
    type: "keyCombination";
    default: string[];
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
}>]>>, z.ZodPromise<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<z.objectUtil.extendShape<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    disabled: z.ZodOptional<z.ZodBoolean>;
}, {
    type: z.ZodLiteral<"text">;
    default: z.ZodString;
    placeholder: z.ZodOptional<z.ZodString>;
}>, "strip", z.ZodTypeAny, {
    name: string;
    type: "text";
    default: string;
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
}, {
    name: string;
    type: "text";
    default: string;
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
}>, z.ZodObject<z.objectUtil.extendShape<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    disabled: z.ZodOptional<z.ZodBoolean>;
}, {
    type: z.ZodLiteral<"string">;
    default: z.ZodString;
    placeholder: z.ZodOptional<z.ZodString>;
}>, "strip", z.ZodTypeAny, {
    name: string;
    type: "string";
    default: string;
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
}, {
    name: string;
    type: "string";
    default: string;
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
}>, z.ZodObject<z.objectUtil.extendShape<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    disabled: z.ZodOptional<z.ZodBoolean>;
}, {
    type: z.ZodLiteral<"number">;
    default: z.ZodNumber;
    min: z.ZodOptional<z.ZodNumber>;
    max: z.ZodOptional<z.ZodNumber>;
    step: z.ZodOptional<z.ZodNumber>;
    placeholder: z.ZodOptional<z.ZodString>;
}>, "strip", z.ZodTypeAny, {
    name: string;
    type: "number";
    default: number;
    max?: number | undefined;
    min?: number | undefined;
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
    step?: number | undefined;
}, {
    name: string;
    type: "number";
    default: number;
    max?: number | undefined;
    min?: number | undefined;
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
    step?: number | undefined;
}>, z.ZodObject<z.objectUtil.extendShape<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    disabled: z.ZodOptional<z.ZodBoolean>;
}, {
    type: z.ZodLiteral<"boolean">;
    default: z.ZodBoolean;
}>, "strip", z.ZodTypeAny, {
    name: string;
    type: "boolean";
    default: boolean;
    disabled?: boolean | undefined;
    description?: string | undefined;
}, {
    name: string;
    type: "boolean";
    default: boolean;
    disabled?: boolean | undefined;
    description?: string | undefined;
}>, z.ZodObject<z.objectUtil.extendShape<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    disabled: z.ZodOptional<z.ZodBoolean>;
}, {
    type: z.ZodLiteral<"select">;
    options: z.ZodArray<z.ZodUnion<[z.ZodObject<{
        key: z.ZodString;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        key: string;
    }, {
        name: string;
        key: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"group">;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        type: "group";
    }, {
        name: string;
        type: "group";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"hr">;
    }, "strip", z.ZodTypeAny, {
        type: "hr";
    }, {
        type: "hr";
    }>]>, "many">;
    default: z.ZodString;
}>, "strip", z.ZodTypeAny, {
    name: string;
    type: "select";
    default: string;
    options: ({
        name: string;
        key: string;
    } | {
        name: string;
        type: "group";
    } | {
        type: "hr";
    })[];
    disabled?: boolean | undefined;
    description?: string | undefined;
}, {
    name: string;
    type: "select";
    default: string;
    options: ({
        name: string;
        key: string;
    } | {
        name: string;
        type: "group";
    } | {
        type: "hr";
    })[];
    disabled?: boolean | undefined;
    description?: string | undefined;
}>, z.ZodObject<z.objectUtil.extendShape<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    disabled: z.ZodOptional<z.ZodBoolean>;
}, {
    type: z.ZodLiteral<"keyCombination">;
    default: z.ZodArray<z.ZodString, "many">;
    placeholder: z.ZodOptional<z.ZodString>;
}>, "strip", z.ZodTypeAny, {
    name: string;
    type: "keyCombination";
    default: string[];
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
}, {
    name: string;
    type: "keyCombination";
    default: string[];
    disabled?: boolean | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
}>]>>>]>>]>;
export declare const zPluginFieldValues: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
