import { z } from 'zod';
export declare const zEmitter: z.ZodFunction<z.ZodTuple<[], z.ZodUnknown>, z.ZodUnknown>;
/**
 * プラグインをロードするときにパースする用
 */
export declare const zVirtuButtonPlugin: z.ZodObject<{
    schemaVersion: z.ZodLiteral<1>;
    id: z.ZodString;
    name: z.ZodString;
    version: z.ZodString;
    description: z.ZodCatch<z.ZodString>;
    init: z.ZodCatch<z.ZodFunction<z.ZodTuple<[], z.ZodUnknown>, z.ZodUnknown>>;
    events: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
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
    }>, "many">;
    actions: z.ZodArray<z.ZodObject<{
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
    }>, "many">;
    controlButtons: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        styles: z.ZodCatch<z.ZodArray<z.ZodObject<{
            text: z.ZodCatch<z.ZodString>;
            textSize: z.ZodCatch<z.ZodNumber>;
            color: z.ZodCatch<z.ZodObject<{
                background: z.ZodString;
                text: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                background: string;
                text: string;
            }, {
                background: string;
                text: string;
            }>>;
            image: z.ZodOptional<z.ZodString>;
            icon: z.ZodOptional<z.ZodString>;
            bgOpacity: z.ZodCatch<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            color: {
                background: string;
                text: string;
            };
            text: string;
            textSize: number;
            bgOpacity: number;
            image?: string | undefined;
            icon?: string | undefined;
        }, {
            color?: unknown;
            image?: string | undefined;
            text?: unknown;
            textSize?: unknown;
            icon?: string | undefined;
            bgOpacity?: unknown;
        }>, "many">>;
        onClick: z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodObject<{
            type: z.ZodLiteral<"ControlButton">;
            id: z.ZodCatch<z.ZodString>;
            pluginId: z.ZodString;
            controlButtonId: z.ZodString;
            fieldValues: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            styles: z.ZodCatch<z.ZodArray<z.ZodObject<{
                text: z.ZodCatch<z.ZodString>;
                textSize: z.ZodCatch<z.ZodNumber>;
                color: z.ZodCatch<z.ZodObject<{
                    background: z.ZodString;
                    text: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    background: string;
                    text: string;
                }, {
                    background: string;
                    text: string;
                }>>;
                image: z.ZodOptional<z.ZodString>;
                icon: z.ZodOptional<z.ZodString>;
                bgOpacity: z.ZodCatch<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                color: {
                    background: string;
                    text: string;
                };
                text: string;
                textSize: number;
                bgOpacity: number;
                image?: string | undefined;
                icon?: string | undefined;
            }, {
                color?: unknown;
                image?: string | undefined;
                text?: unknown;
                textSize?: unknown;
                icon?: string | undefined;
                bgOpacity?: unknown;
            }>, "many">>;
            viewProps: z.ZodCatch<z.ZodObject<{
                x: z.ZodCatch<z.ZodNumber>;
                y: z.ZodCatch<z.ZodNumber>;
                w: z.ZodCatch<z.ZodNumber>;
                h: z.ZodCatch<z.ZodNumber>;
                zIndex: z.ZodCatch<z.ZodNumber>;
                styleIndex: z.ZodCatch<z.ZodNumber>;
                temp: z.ZodOptional<z.ZodObject<{
                    title: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    title?: string | undefined;
                }, {
                    title?: string | undefined;
                }>>;
            }, "strip", z.ZodTypeAny, {
                x: number;
                y: number;
                zIndex: number;
                w: number;
                h: number;
                styleIndex: number;
                temp?: {
                    title?: string | undefined;
                } | undefined;
            }, {
                x?: unknown;
                y?: unknown;
                zIndex?: unknown;
                w?: unknown;
                h?: unknown;
                styleIndex?: unknown;
                temp?: {
                    title?: string | undefined;
                } | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            type: "ControlButton";
            id: string;
            pluginId: string;
            fieldValues: Record<string, string | number | boolean | string[]>;
            styles: {
                color: {
                    background: string;
                    text: string;
                };
                text: string;
                textSize: number;
                bgOpacity: number;
                image?: string | undefined;
                icon?: string | undefined;
            }[];
            viewProps: {
                x: number;
                y: number;
                zIndex: number;
                w: number;
                h: number;
                styleIndex: number;
                temp?: {
                    title?: string | undefined;
                } | undefined;
            };
            controlButtonId: string;
        }, {
            type: "ControlButton";
            pluginId: string;
            fieldValues: Record<string, string | number | boolean | string[]>;
            controlButtonId: string;
            id?: unknown;
            styles?: unknown;
            viewProps?: unknown;
        }>], z.ZodUnknown>, z.ZodVoid>>;
        onDown: z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodObject<{
            type: z.ZodLiteral<"ControlButton">;
            id: z.ZodCatch<z.ZodString>;
            pluginId: z.ZodString;
            controlButtonId: z.ZodString;
            fieldValues: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            styles: z.ZodCatch<z.ZodArray<z.ZodObject<{
                text: z.ZodCatch<z.ZodString>;
                textSize: z.ZodCatch<z.ZodNumber>;
                color: z.ZodCatch<z.ZodObject<{
                    background: z.ZodString;
                    text: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    background: string;
                    text: string;
                }, {
                    background: string;
                    text: string;
                }>>;
                image: z.ZodOptional<z.ZodString>;
                icon: z.ZodOptional<z.ZodString>;
                bgOpacity: z.ZodCatch<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                color: {
                    background: string;
                    text: string;
                };
                text: string;
                textSize: number;
                bgOpacity: number;
                image?: string | undefined;
                icon?: string | undefined;
            }, {
                color?: unknown;
                image?: string | undefined;
                text?: unknown;
                textSize?: unknown;
                icon?: string | undefined;
                bgOpacity?: unknown;
            }>, "many">>;
            viewProps: z.ZodCatch<z.ZodObject<{
                x: z.ZodCatch<z.ZodNumber>;
                y: z.ZodCatch<z.ZodNumber>;
                w: z.ZodCatch<z.ZodNumber>;
                h: z.ZodCatch<z.ZodNumber>;
                zIndex: z.ZodCatch<z.ZodNumber>;
                styleIndex: z.ZodCatch<z.ZodNumber>;
                temp: z.ZodOptional<z.ZodObject<{
                    title: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    title?: string | undefined;
                }, {
                    title?: string | undefined;
                }>>;
            }, "strip", z.ZodTypeAny, {
                x: number;
                y: number;
                zIndex: number;
                w: number;
                h: number;
                styleIndex: number;
                temp?: {
                    title?: string | undefined;
                } | undefined;
            }, {
                x?: unknown;
                y?: unknown;
                zIndex?: unknown;
                w?: unknown;
                h?: unknown;
                styleIndex?: unknown;
                temp?: {
                    title?: string | undefined;
                } | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            type: "ControlButton";
            id: string;
            pluginId: string;
            fieldValues: Record<string, string | number | boolean | string[]>;
            styles: {
                color: {
                    background: string;
                    text: string;
                };
                text: string;
                textSize: number;
                bgOpacity: number;
                image?: string | undefined;
                icon?: string | undefined;
            }[];
            viewProps: {
                x: number;
                y: number;
                zIndex: number;
                w: number;
                h: number;
                styleIndex: number;
                temp?: {
                    title?: string | undefined;
                } | undefined;
            };
            controlButtonId: string;
        }, {
            type: "ControlButton";
            pluginId: string;
            fieldValues: Record<string, string | number | boolean | string[]>;
            controlButtonId: string;
            id?: unknown;
            styles?: unknown;
            viewProps?: unknown;
        }>], z.ZodUnknown>, z.ZodVoid>>;
        onUp: z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodObject<{
            type: z.ZodLiteral<"ControlButton">;
            id: z.ZodCatch<z.ZodString>;
            pluginId: z.ZodString;
            controlButtonId: z.ZodString;
            fieldValues: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            styles: z.ZodCatch<z.ZodArray<z.ZodObject<{
                text: z.ZodCatch<z.ZodString>;
                textSize: z.ZodCatch<z.ZodNumber>;
                color: z.ZodCatch<z.ZodObject<{
                    background: z.ZodString;
                    text: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    background: string;
                    text: string;
                }, {
                    background: string;
                    text: string;
                }>>;
                image: z.ZodOptional<z.ZodString>;
                icon: z.ZodOptional<z.ZodString>;
                bgOpacity: z.ZodCatch<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                color: {
                    background: string;
                    text: string;
                };
                text: string;
                textSize: number;
                bgOpacity: number;
                image?: string | undefined;
                icon?: string | undefined;
            }, {
                color?: unknown;
                image?: string | undefined;
                text?: unknown;
                textSize?: unknown;
                icon?: string | undefined;
                bgOpacity?: unknown;
            }>, "many">>;
            viewProps: z.ZodCatch<z.ZodObject<{
                x: z.ZodCatch<z.ZodNumber>;
                y: z.ZodCatch<z.ZodNumber>;
                w: z.ZodCatch<z.ZodNumber>;
                h: z.ZodCatch<z.ZodNumber>;
                zIndex: z.ZodCatch<z.ZodNumber>;
                styleIndex: z.ZodCatch<z.ZodNumber>;
                temp: z.ZodOptional<z.ZodObject<{
                    title: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    title?: string | undefined;
                }, {
                    title?: string | undefined;
                }>>;
            }, "strip", z.ZodTypeAny, {
                x: number;
                y: number;
                zIndex: number;
                w: number;
                h: number;
                styleIndex: number;
                temp?: {
                    title?: string | undefined;
                } | undefined;
            }, {
                x?: unknown;
                y?: unknown;
                zIndex?: unknown;
                w?: unknown;
                h?: unknown;
                styleIndex?: unknown;
                temp?: {
                    title?: string | undefined;
                } | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            type: "ControlButton";
            id: string;
            pluginId: string;
            fieldValues: Record<string, string | number | boolean | string[]>;
            styles: {
                color: {
                    background: string;
                    text: string;
                };
                text: string;
                textSize: number;
                bgOpacity: number;
                image?: string | undefined;
                icon?: string | undefined;
            }[];
            viewProps: {
                x: number;
                y: number;
                zIndex: number;
                w: number;
                h: number;
                styleIndex: number;
                temp?: {
                    title?: string | undefined;
                } | undefined;
            };
            controlButtonId: string;
        }, {
            type: "ControlButton";
            pluginId: string;
            fieldValues: Record<string, string | number | boolean | string[]>;
            controlButtonId: string;
            id?: unknown;
            styles?: unknown;
            viewProps?: unknown;
        }>], z.ZodUnknown>, z.ZodVoid>>;
        onMount: z.ZodFunction<z.ZodTuple<[z.ZodObject<{
            type: z.ZodLiteral<"ControlButton">;
            id: z.ZodCatch<z.ZodString>;
            pluginId: z.ZodString;
            controlButtonId: z.ZodString;
            fieldValues: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            styles: z.ZodCatch<z.ZodArray<z.ZodObject<{
                text: z.ZodCatch<z.ZodString>;
                textSize: z.ZodCatch<z.ZodNumber>;
                color: z.ZodCatch<z.ZodObject<{
                    background: z.ZodString;
                    text: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    background: string;
                    text: string;
                }, {
                    background: string;
                    text: string;
                }>>;
                image: z.ZodOptional<z.ZodString>;
                icon: z.ZodOptional<z.ZodString>;
                bgOpacity: z.ZodCatch<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                color: {
                    background: string;
                    text: string;
                };
                text: string;
                textSize: number;
                bgOpacity: number;
                image?: string | undefined;
                icon?: string | undefined;
            }, {
                color?: unknown;
                image?: string | undefined;
                text?: unknown;
                textSize?: unknown;
                icon?: string | undefined;
                bgOpacity?: unknown;
            }>, "many">>;
            viewProps: z.ZodCatch<z.ZodObject<{
                x: z.ZodCatch<z.ZodNumber>;
                y: z.ZodCatch<z.ZodNumber>;
                w: z.ZodCatch<z.ZodNumber>;
                h: z.ZodCatch<z.ZodNumber>;
                zIndex: z.ZodCatch<z.ZodNumber>;
                styleIndex: z.ZodCatch<z.ZodNumber>;
                temp: z.ZodOptional<z.ZodObject<{
                    title: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    title?: string | undefined;
                }, {
                    title?: string | undefined;
                }>>;
            }, "strip", z.ZodTypeAny, {
                x: number;
                y: number;
                zIndex: number;
                w: number;
                h: number;
                styleIndex: number;
                temp?: {
                    title?: string | undefined;
                } | undefined;
            }, {
                x?: unknown;
                y?: unknown;
                zIndex?: unknown;
                w?: unknown;
                h?: unknown;
                styleIndex?: unknown;
                temp?: {
                    title?: string | undefined;
                } | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            type: "ControlButton";
            id: string;
            pluginId: string;
            fieldValues: Record<string, string | number | boolean | string[]>;
            styles: {
                color: {
                    background: string;
                    text: string;
                };
                text: string;
                textSize: number;
                bgOpacity: number;
                image?: string | undefined;
                icon?: string | undefined;
            }[];
            viewProps: {
                x: number;
                y: number;
                zIndex: number;
                w: number;
                h: number;
                styleIndex: number;
                temp?: {
                    title?: string | undefined;
                } | undefined;
            };
            controlButtonId: string;
        }, {
            type: "ControlButton";
            pluginId: string;
            fieldValues: Record<string, string | number | boolean | string[]>;
            controlButtonId: string;
            id?: unknown;
            styles?: unknown;
            viewProps?: unknown;
        }>], z.ZodUnknown>, z.ZodVoid>;
        onDestroy: z.ZodFunction<z.ZodTuple<[z.ZodObject<{
            type: z.ZodLiteral<"ControlButton">;
            id: z.ZodCatch<z.ZodString>;
            pluginId: z.ZodString;
            controlButtonId: z.ZodString;
            fieldValues: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            styles: z.ZodCatch<z.ZodArray<z.ZodObject<{
                text: z.ZodCatch<z.ZodString>;
                textSize: z.ZodCatch<z.ZodNumber>;
                color: z.ZodCatch<z.ZodObject<{
                    background: z.ZodString;
                    text: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    background: string;
                    text: string;
                }, {
                    background: string;
                    text: string;
                }>>;
                image: z.ZodOptional<z.ZodString>;
                icon: z.ZodOptional<z.ZodString>;
                bgOpacity: z.ZodCatch<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                color: {
                    background: string;
                    text: string;
                };
                text: string;
                textSize: number;
                bgOpacity: number;
                image?: string | undefined;
                icon?: string | undefined;
            }, {
                color?: unknown;
                image?: string | undefined;
                text?: unknown;
                textSize?: unknown;
                icon?: string | undefined;
                bgOpacity?: unknown;
            }>, "many">>;
            viewProps: z.ZodCatch<z.ZodObject<{
                x: z.ZodCatch<z.ZodNumber>;
                y: z.ZodCatch<z.ZodNumber>;
                w: z.ZodCatch<z.ZodNumber>;
                h: z.ZodCatch<z.ZodNumber>;
                zIndex: z.ZodCatch<z.ZodNumber>;
                styleIndex: z.ZodCatch<z.ZodNumber>;
                temp: z.ZodOptional<z.ZodObject<{
                    title: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    title?: string | undefined;
                }, {
                    title?: string | undefined;
                }>>;
            }, "strip", z.ZodTypeAny, {
                x: number;
                y: number;
                zIndex: number;
                w: number;
                h: number;
                styleIndex: number;
                temp?: {
                    title?: string | undefined;
                } | undefined;
            }, {
                x?: unknown;
                y?: unknown;
                zIndex?: unknown;
                w?: unknown;
                h?: unknown;
                styleIndex?: unknown;
                temp?: {
                    title?: string | undefined;
                } | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            type: "ControlButton";
            id: string;
            pluginId: string;
            fieldValues: Record<string, string | number | boolean | string[]>;
            styles: {
                color: {
                    background: string;
                    text: string;
                };
                text: string;
                textSize: number;
                bgOpacity: number;
                image?: string | undefined;
                icon?: string | undefined;
            }[];
            viewProps: {
                x: number;
                y: number;
                zIndex: number;
                w: number;
                h: number;
                styleIndex: number;
                temp?: {
                    title?: string | undefined;
                } | undefined;
            };
            controlButtonId: string;
        }, {
            type: "ControlButton";
            pluginId: string;
            fieldValues: Record<string, string | number | boolean | string[]>;
            controlButtonId: string;
            id?: unknown;
            styles?: unknown;
            viewProps?: unknown;
        }>], z.ZodUnknown>, z.ZodVoid>;
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
        styles: {
            color: {
                background: string;
                text: string;
            };
            text: string;
            textSize: number;
            bgOpacity: number;
            image?: string | undefined;
            icon?: string | undefined;
        }[];
        onMount: (args_0: {
            type: "ControlButton";
            pluginId: string;
            fieldValues: Record<string, string | number | boolean | string[]>;
            controlButtonId: string;
            id?: unknown;
            styles?: unknown;
            viewProps?: unknown;
        }, ...args_1: unknown[]) => void;
        onDestroy: (args_0: {
            type: "ControlButton";
            pluginId: string;
            fieldValues: Record<string, string | number | boolean | string[]>;
            controlButtonId: string;
            id?: unknown;
            styles?: unknown;
            viewProps?: unknown;
        }, ...args_1: unknown[]) => void;
        description?: string | undefined;
        onClick?: ((args_0: {
            type: "ControlButton";
            pluginId: string;
            fieldValues: Record<string, string | number | boolean | string[]>;
            controlButtonId: string;
            id?: unknown;
            styles?: unknown;
            viewProps?: unknown;
        }, ...args_1: unknown[]) => void) | undefined;
        onDown?: ((args_0: {
            type: "ControlButton";
            pluginId: string;
            fieldValues: Record<string, string | number | boolean | string[]>;
            controlButtonId: string;
            id?: unknown;
            styles?: unknown;
            viewProps?: unknown;
        }, ...args_1: unknown[]) => void) | undefined;
        onUp?: ((args_0: {
            type: "ControlButton";
            pluginId: string;
            fieldValues: Record<string, string | number | boolean | string[]>;
            controlButtonId: string;
            id?: unknown;
            styles?: unknown;
            viewProps?: unknown;
        }, ...args_1: unknown[]) => void) | undefined;
    }, {
        name: string;
        id: string;
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
        onMount: (args_0: {
            type: "ControlButton";
            id: string;
            pluginId: string;
            fieldValues: Record<string, string | number | boolean | string[]>;
            styles: {
                color: {
                    background: string;
                    text: string;
                };
                text: string;
                textSize: number;
                bgOpacity: number;
                image?: string | undefined;
                icon?: string | undefined;
            }[];
            viewProps: {
                x: number;
                y: number;
                zIndex: number;
                w: number;
                h: number;
                styleIndex: number;
                temp?: {
                    title?: string | undefined;
                } | undefined;
            };
            controlButtonId: string;
        }, ...args_1: unknown[]) => void;
        onDestroy: (args_0: {
            type: "ControlButton";
            id: string;
            pluginId: string;
            fieldValues: Record<string, string | number | boolean | string[]>;
            styles: {
                color: {
                    background: string;
                    text: string;
                };
                text: string;
                textSize: number;
                bgOpacity: number;
                image?: string | undefined;
                icon?: string | undefined;
            }[];
            viewProps: {
                x: number;
                y: number;
                zIndex: number;
                w: number;
                h: number;
                styleIndex: number;
                temp?: {
                    title?: string | undefined;
                } | undefined;
            };
            controlButtonId: string;
        }, ...args_1: unknown[]) => void;
        description?: string | undefined;
        styles?: unknown;
        onClick?: ((args_0: {
            type: "ControlButton";
            id: string;
            pluginId: string;
            fieldValues: Record<string, string | number | boolean | string[]>;
            styles: {
                color: {
                    background: string;
                    text: string;
                };
                text: string;
                textSize: number;
                bgOpacity: number;
                image?: string | undefined;
                icon?: string | undefined;
            }[];
            viewProps: {
                x: number;
                y: number;
                zIndex: number;
                w: number;
                h: number;
                styleIndex: number;
                temp?: {
                    title?: string | undefined;
                } | undefined;
            };
            controlButtonId: string;
        }, ...args_1: unknown[]) => void) | undefined;
        onDown?: ((args_0: {
            type: "ControlButton";
            id: string;
            pluginId: string;
            fieldValues: Record<string, string | number | boolean | string[]>;
            styles: {
                color: {
                    background: string;
                    text: string;
                };
                text: string;
                textSize: number;
                bgOpacity: number;
                image?: string | undefined;
                icon?: string | undefined;
            }[];
            viewProps: {
                x: number;
                y: number;
                zIndex: number;
                w: number;
                h: number;
                styleIndex: number;
                temp?: {
                    title?: string | undefined;
                } | undefined;
            };
            controlButtonId: string;
        }, ...args_1: unknown[]) => void) | undefined;
        onUp?: ((args_0: {
            type: "ControlButton";
            id: string;
            pluginId: string;
            fieldValues: Record<string, string | number | boolean | string[]>;
            styles: {
                color: {
                    background: string;
                    text: string;
                };
                text: string;
                textSize: number;
                bgOpacity: number;
                image?: string | undefined;
                icon?: string | undefined;
            }[];
            viewProps: {
                x: number;
                y: number;
                zIndex: number;
                w: number;
                h: number;
                styleIndex: number;
                temp?: {
                    title?: string | undefined;
                } | undefined;
            };
            controlButtonId: string;
        }, ...args_1: unknown[]) => void) | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    name: string;
    id: string;
    description: string;
    schemaVersion: 1;
    version: string;
    init: (...args: unknown[]) => unknown;
    events: {
        name: string;
        id: string;
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
    }[];
    actions: {
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
    }[];
    controlButtons: {
        name: string;
        id: string;
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
        styles: {
            color: {
                background: string;
                text: string;
            };
            text: string;
            textSize: number;
            bgOpacity: number;
            image?: string | undefined;
            icon?: string | undefined;
        }[];
        onMount: (args_0: {
            type: "ControlButton";
            pluginId: string;
            fieldValues: Record<string, string | number | boolean | string[]>;
            controlButtonId: string;
            id?: unknown;
            styles?: unknown;
            viewProps?: unknown;
        }, ...args_1: unknown[]) => void;
        onDestroy: (args_0: {
            type: "ControlButton";
            pluginId: string;
            fieldValues: Record<string, string | number | boolean | string[]>;
            controlButtonId: string;
            id?: unknown;
            styles?: unknown;
            viewProps?: unknown;
        }, ...args_1: unknown[]) => void;
        description?: string | undefined;
        onClick?: ((args_0: {
            type: "ControlButton";
            pluginId: string;
            fieldValues: Record<string, string | number | boolean | string[]>;
            controlButtonId: string;
            id?: unknown;
            styles?: unknown;
            viewProps?: unknown;
        }, ...args_1: unknown[]) => void) | undefined;
        onDown?: ((args_0: {
            type: "ControlButton";
            pluginId: string;
            fieldValues: Record<string, string | number | boolean | string[]>;
            controlButtonId: string;
            id?: unknown;
            styles?: unknown;
            viewProps?: unknown;
        }, ...args_1: unknown[]) => void) | undefined;
        onUp?: ((args_0: {
            type: "ControlButton";
            pluginId: string;
            fieldValues: Record<string, string | number | boolean | string[]>;
            controlButtonId: string;
            id?: unknown;
            styles?: unknown;
            viewProps?: unknown;
        }, ...args_1: unknown[]) => void) | undefined;
    }[];
}, {
    name: string;
    id: string;
    schemaVersion: 1;
    version: string;
    events: {
        name: string;
        id: string;
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
    }[];
    actions: {
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
    }[];
    controlButtons: {
        name: string;
        id: string;
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
        onMount: (args_0: {
            type: "ControlButton";
            id: string;
            pluginId: string;
            fieldValues: Record<string, string | number | boolean | string[]>;
            styles: {
                color: {
                    background: string;
                    text: string;
                };
                text: string;
                textSize: number;
                bgOpacity: number;
                image?: string | undefined;
                icon?: string | undefined;
            }[];
            viewProps: {
                x: number;
                y: number;
                zIndex: number;
                w: number;
                h: number;
                styleIndex: number;
                temp?: {
                    title?: string | undefined;
                } | undefined;
            };
            controlButtonId: string;
        }, ...args_1: unknown[]) => void;
        onDestroy: (args_0: {
            type: "ControlButton";
            id: string;
            pluginId: string;
            fieldValues: Record<string, string | number | boolean | string[]>;
            styles: {
                color: {
                    background: string;
                    text: string;
                };
                text: string;
                textSize: number;
                bgOpacity: number;
                image?: string | undefined;
                icon?: string | undefined;
            }[];
            viewProps: {
                x: number;
                y: number;
                zIndex: number;
                w: number;
                h: number;
                styleIndex: number;
                temp?: {
                    title?: string | undefined;
                } | undefined;
            };
            controlButtonId: string;
        }, ...args_1: unknown[]) => void;
        description?: string | undefined;
        styles?: unknown;
        onClick?: ((args_0: {
            type: "ControlButton";
            id: string;
            pluginId: string;
            fieldValues: Record<string, string | number | boolean | string[]>;
            styles: {
                color: {
                    background: string;
                    text: string;
                };
                text: string;
                textSize: number;
                bgOpacity: number;
                image?: string | undefined;
                icon?: string | undefined;
            }[];
            viewProps: {
                x: number;
                y: number;
                zIndex: number;
                w: number;
                h: number;
                styleIndex: number;
                temp?: {
                    title?: string | undefined;
                } | undefined;
            };
            controlButtonId: string;
        }, ...args_1: unknown[]) => void) | undefined;
        onDown?: ((args_0: {
            type: "ControlButton";
            id: string;
            pluginId: string;
            fieldValues: Record<string, string | number | boolean | string[]>;
            styles: {
                color: {
                    background: string;
                    text: string;
                };
                text: string;
                textSize: number;
                bgOpacity: number;
                image?: string | undefined;
                icon?: string | undefined;
            }[];
            viewProps: {
                x: number;
                y: number;
                zIndex: number;
                w: number;
                h: number;
                styleIndex: number;
                temp?: {
                    title?: string | undefined;
                } | undefined;
            };
            controlButtonId: string;
        }, ...args_1: unknown[]) => void) | undefined;
        onUp?: ((args_0: {
            type: "ControlButton";
            id: string;
            pluginId: string;
            fieldValues: Record<string, string | number | boolean | string[]>;
            styles: {
                color: {
                    background: string;
                    text: string;
                };
                text: string;
                textSize: number;
                bgOpacity: number;
                image?: string | undefined;
                icon?: string | undefined;
            }[];
            viewProps: {
                x: number;
                y: number;
                zIndex: number;
                w: number;
                h: number;
                styleIndex: number;
                temp?: {
                    title?: string | undefined;
                } | undefined;
            };
            controlButtonId: string;
        }, ...args_1: unknown[]) => void) | undefined;
    }[];
    description?: unknown;
    init?: unknown;
}>;
