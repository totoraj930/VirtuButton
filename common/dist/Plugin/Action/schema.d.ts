import { z } from 'zod';
export declare const zPluginAction: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    run: z.ZodFunction<z.ZodTuple<[], z.ZodUnknown>, z.ZodUnknown>;
    fields: z.ZodUnion<[z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<z.objectUtil.extendShape<{
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
}, "strip", z.ZodTypeAny, {
    name: string;
    id: string;
    run: (...args: unknown[]) => unknown;
    fields: Record<string, {
        name: string;
        type: "string";
        default: string;
        disabled?: boolean | undefined;
        description?: string | undefined;
        placeholder?: string | undefined;
    } | {
        name: string;
        type: "text";
        default: string;
        disabled?: boolean | undefined;
        description?: string | undefined;
        placeholder?: string | undefined;
    } | {
        name: string;
        type: "number";
        default: number;
        max?: number | undefined;
        min?: number | undefined;
        disabled?: boolean | undefined;
        description?: string | undefined;
        placeholder?: string | undefined;
        step?: number | undefined;
    } | {
        name: string;
        type: "boolean";
        default: boolean;
        disabled?: boolean | undefined;
        description?: string | undefined;
    } | {
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
    } | {
        name: string;
        type: "keyCombination";
        default: string[];
        disabled?: boolean | undefined;
        description?: string | undefined;
        placeholder?: string | undefined;
    }> | ((...args: unknown[]) => Record<string, {
        name: string;
        type: "string";
        default: string;
        disabled?: boolean | undefined;
        description?: string | undefined;
        placeholder?: string | undefined;
    } | {
        name: string;
        type: "text";
        default: string;
        disabled?: boolean | undefined;
        description?: string | undefined;
        placeholder?: string | undefined;
    } | {
        name: string;
        type: "number";
        default: number;
        max?: number | undefined;
        min?: number | undefined;
        disabled?: boolean | undefined;
        description?: string | undefined;
        placeholder?: string | undefined;
        step?: number | undefined;
    } | {
        name: string;
        type: "boolean";
        default: boolean;
        disabled?: boolean | undefined;
        description?: string | undefined;
    } | {
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
    } | {
        name: string;
        type: "keyCombination";
        default: string[];
        disabled?: boolean | undefined;
        description?: string | undefined;
        placeholder?: string | undefined;
    }> | Promise<Record<string, {
        name: string;
        type: "string";
        default: string;
        disabled?: boolean | undefined;
        description?: string | undefined;
        placeholder?: string | undefined;
    } | {
        name: string;
        type: "text";
        default: string;
        disabled?: boolean | undefined;
        description?: string | undefined;
        placeholder?: string | undefined;
    } | {
        name: string;
        type: "number";
        default: number;
        max?: number | undefined;
        min?: number | undefined;
        disabled?: boolean | undefined;
        description?: string | undefined;
        placeholder?: string | undefined;
        step?: number | undefined;
    } | {
        name: string;
        type: "boolean";
        default: boolean;
        disabled?: boolean | undefined;
        description?: string | undefined;
    } | {
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
    } | {
        name: string;
        type: "keyCombination";
        default: string[];
        disabled?: boolean | undefined;
        description?: string | undefined;
        placeholder?: string | undefined;
    }>>);
    description?: string | undefined;
}, {
    name: string;
    id: string;
    run: (...args: unknown[]) => unknown;
    fields: Record<string, {
        name: string;
        type: "string";
        default: string;
        disabled?: boolean | undefined;
        description?: string | undefined;
        placeholder?: string | undefined;
    } | {
        name: string;
        type: "text";
        default: string;
        disabled?: boolean | undefined;
        description?: string | undefined;
        placeholder?: string | undefined;
    } | {
        name: string;
        type: "number";
        default: number;
        max?: number | undefined;
        min?: number | undefined;
        disabled?: boolean | undefined;
        description?: string | undefined;
        placeholder?: string | undefined;
        step?: number | undefined;
    } | {
        name: string;
        type: "boolean";
        default: boolean;
        disabled?: boolean | undefined;
        description?: string | undefined;
    } | {
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
    } | {
        name: string;
        type: "keyCombination";
        default: string[];
        disabled?: boolean | undefined;
        description?: string | undefined;
        placeholder?: string | undefined;
    }> | ((...args: unknown[]) => Record<string, {
        name: string;
        type: "string";
        default: string;
        disabled?: boolean | undefined;
        description?: string | undefined;
        placeholder?: string | undefined;
    } | {
        name: string;
        type: "text";
        default: string;
        disabled?: boolean | undefined;
        description?: string | undefined;
        placeholder?: string | undefined;
    } | {
        name: string;
        type: "number";
        default: number;
        max?: number | undefined;
        min?: number | undefined;
        disabled?: boolean | undefined;
        description?: string | undefined;
        placeholder?: string | undefined;
        step?: number | undefined;
    } | {
        name: string;
        type: "boolean";
        default: boolean;
        disabled?: boolean | undefined;
        description?: string | undefined;
    } | {
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
    } | {
        name: string;
        type: "keyCombination";
        default: string[];
        disabled?: boolean | undefined;
        description?: string | undefined;
        placeholder?: string | undefined;
    }> | Promise<Record<string, {
        name: string;
        type: "string";
        default: string;
        disabled?: boolean | undefined;
        description?: string | undefined;
        placeholder?: string | undefined;
    } | {
        name: string;
        type: "text";
        default: string;
        disabled?: boolean | undefined;
        description?: string | undefined;
        placeholder?: string | undefined;
    } | {
        name: string;
        type: "number";
        default: number;
        max?: number | undefined;
        min?: number | undefined;
        disabled?: boolean | undefined;
        description?: string | undefined;
        placeholder?: string | undefined;
        step?: number | undefined;
    } | {
        name: string;
        type: "boolean";
        default: boolean;
        disabled?: boolean | undefined;
        description?: string | undefined;
    } | {
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
    } | {
        name: string;
        type: "keyCombination";
        default: string[];
        disabled?: boolean | undefined;
        description?: string | undefined;
        placeholder?: string | undefined;
    }>>);
    description?: string | undefined;
}>;
