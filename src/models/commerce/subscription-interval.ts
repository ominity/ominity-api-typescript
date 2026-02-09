/*
 * Commerce Subscription Interval model.
 */

import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import { HalLinks, HalLinks$inboundSchema } from "../hal.js";

export type SubscriptionInterval = {
    resource: string;
    id: number;
    name: string;
    frequency: number;
    intervalUnit: string;
    daysOfWeek: Array<string>;
    daysOfMonth: Array<number>;
    months: Array<string>;
    updatedAt: string;
    createdAt: string;
    links?: HalLinks;
};

/** @internal */
export const SubscriptionInterval$inboundSchema: z.ZodType<SubscriptionInterval> = z.object({
    resource: z.string(),
    id: z.number(),
    name: z.string(),
    frequency: z.number(),
    intervalUnit: z.string(),
    daysOfWeek: z.array(z.string()),
    daysOfMonth: z.array(z.number()),
    months: z.array(z.string()),
    updatedAt: z.string(),
    createdAt: z.string(),
    _links: HalLinks$inboundSchema.optional(),
}).transform((v) => {
    return remap$(v, {
        "_links": "links",
    }) as SubscriptionInterval;
});
