import { z } from 'zod';
export declare const zButtonTask: z.ZodObject<{
    id: z.ZodCatch<z.ZodString>;
    actionId: z.ZodString;
    pluginId: z.ZodString;
    fieldValues: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    pluginId: string;
    actionId: string;
    fieldValues: Record<string, string | number | boolean | string[]>;
}, {
    pluginId: string;
    actionId: string;
    fieldValues: Record<string, string | number | boolean | string[]>;
    id?: unknown;
}>;
export declare const zButtonHandler: z.ZodObject<{
    id: z.ZodCatch<z.ZodString>;
    event: z.ZodObject<{
        eventId: z.ZodString;
        pluginId: z.ZodString;
        fieldValues: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    }, "strip", z.ZodTypeAny, {
        pluginId: string;
        fieldValues: Record<string, string | number | boolean | string[]>;
        eventId: string;
    }, {
        pluginId: string;
        fieldValues: Record<string, string | number | boolean | string[]>;
        eventId: string;
    }>;
    tasks: z.ZodArray<z.ZodObject<{
        id: z.ZodCatch<z.ZodString>;
        actionId: z.ZodString;
        pluginId: z.ZodString;
        fieldValues: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        pluginId: string;
        actionId: string;
        fieldValues: Record<string, string | number | boolean | string[]>;
    }, {
        pluginId: string;
        actionId: string;
        fieldValues: Record<string, string | number | boolean | string[]>;
        id?: unknown;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    id: string;
    event: {
        pluginId: string;
        fieldValues: Record<string, string | number | boolean | string[]>;
        eventId: string;
    };
    tasks: {
        id: string;
        pluginId: string;
        actionId: string;
        fieldValues: Record<string, string | number | boolean | string[]>;
    }[];
}, {
    event: {
        pluginId: string;
        fieldValues: Record<string, string | number | boolean | string[]>;
        eventId: string;
    };
    tasks: {
        pluginId: string;
        actionId: string;
        fieldValues: Record<string, string | number | boolean | string[]>;
        id?: unknown;
    }[];
    id?: unknown;
}>;
export declare const zButtonStyle: z.ZodObject<{
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
}>;
export declare const zButtonViewProps: z.ZodObject<{
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
}>;
export declare const zButton: z.ZodObject<{
    id: z.ZodCatch<z.ZodString>;
    type: z.ZodLiteral<"Button">;
    handlers: z.ZodCatch<z.ZodArray<z.ZodObject<{
        id: z.ZodCatch<z.ZodString>;
        event: z.ZodObject<{
            eventId: z.ZodString;
            pluginId: z.ZodString;
            fieldValues: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        }, "strip", z.ZodTypeAny, {
            pluginId: string;
            fieldValues: Record<string, string | number | boolean | string[]>;
            eventId: string;
        }, {
            pluginId: string;
            fieldValues: Record<string, string | number | boolean | string[]>;
            eventId: string;
        }>;
        tasks: z.ZodArray<z.ZodObject<{
            id: z.ZodCatch<z.ZodString>;
            actionId: z.ZodString;
            pluginId: z.ZodString;
            fieldValues: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            pluginId: string;
            actionId: string;
            fieldValues: Record<string, string | number | boolean | string[]>;
        }, {
            pluginId: string;
            actionId: string;
            fieldValues: Record<string, string | number | boolean | string[]>;
            id?: unknown;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        event: {
            pluginId: string;
            fieldValues: Record<string, string | number | boolean | string[]>;
            eventId: string;
        };
        tasks: {
            id: string;
            pluginId: string;
            actionId: string;
            fieldValues: Record<string, string | number | boolean | string[]>;
        }[];
    }, {
        event: {
            pluginId: string;
            fieldValues: Record<string, string | number | boolean | string[]>;
            eventId: string;
        };
        tasks: {
            pluginId: string;
            actionId: string;
            fieldValues: Record<string, string | number | boolean | string[]>;
            id?: unknown;
        }[];
        id?: unknown;
    }>, "many">>;
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
    type: "Button";
    id: string;
    handlers: {
        id: string;
        event: {
            pluginId: string;
            fieldValues: Record<string, string | number | boolean | string[]>;
            eventId: string;
        };
        tasks: {
            id: string;
            pluginId: string;
            actionId: string;
            fieldValues: Record<string, string | number | boolean | string[]>;
        }[];
    }[];
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
}, {
    type: "Button";
    id?: unknown;
    handlers?: unknown;
    styles?: unknown;
    viewProps?: unknown;
}>;
export declare const zButtonViewPayload: z.ZodObject<Omit<{
    id: z.ZodCatch<z.ZodString>;
    type: z.ZodLiteral<"Button">;
    handlers: z.ZodCatch<z.ZodArray<z.ZodObject<{
        id: z.ZodCatch<z.ZodString>;
        event: z.ZodObject<{
            eventId: z.ZodString;
            pluginId: z.ZodString;
            fieldValues: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        }, "strip", z.ZodTypeAny, {
            pluginId: string;
            fieldValues: Record<string, string | number | boolean | string[]>;
            eventId: string;
        }, {
            pluginId: string;
            fieldValues: Record<string, string | number | boolean | string[]>;
            eventId: string;
        }>;
        tasks: z.ZodArray<z.ZodObject<{
            id: z.ZodCatch<z.ZodString>;
            actionId: z.ZodString;
            pluginId: z.ZodString;
            fieldValues: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            pluginId: string;
            actionId: string;
            fieldValues: Record<string, string | number | boolean | string[]>;
        }, {
            pluginId: string;
            actionId: string;
            fieldValues: Record<string, string | number | boolean | string[]>;
            id?: unknown;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        event: {
            pluginId: string;
            fieldValues: Record<string, string | number | boolean | string[]>;
            eventId: string;
        };
        tasks: {
            id: string;
            pluginId: string;
            actionId: string;
            fieldValues: Record<string, string | number | boolean | string[]>;
        }[];
    }, {
        event: {
            pluginId: string;
            fieldValues: Record<string, string | number | boolean | string[]>;
            eventId: string;
        };
        tasks: {
            pluginId: string;
            actionId: string;
            fieldValues: Record<string, string | number | boolean | string[]>;
            id?: unknown;
        }[];
        id?: unknown;
    }>, "many">>;
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
}, "handlers">, "strip", z.ZodTypeAny, {
    type: "Button";
    id: string;
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
}, {
    type: "Button";
    id?: unknown;
    styles?: unknown;
    viewProps?: unknown;
}>;
