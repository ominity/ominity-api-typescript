import * as z from "zod/v4";
import { HalLinks$inboundSchema } from "../hal.js";
import { buildPaginated, Paginated } from "../pagination.js";

export type ListRequest = {
  include?: string | undefined;
  filter?: Record<string, unknown> | undefined;
  sort?: string | undefined;
  page?: number | undefined;
  limit?: number | undefined;
};

/** @internal */
export const ListRequest$outboundSchema = z.object({
  include: z.string().optional(),
  filter: z.record(z.string(), z.unknown()).optional(),
  sort: z.string().optional(),
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().max(250).optional(),
});

/** @internal */
export function paginatedSchema<T>(
  key: string,
  itemSchema: z.ZodType<T>,
): z.ZodType<Paginated<T>> {
  return z.object({
    _embedded: z.record(z.string(), z.unknown()),
    count: z.number(),
    _links: HalLinks$inboundSchema.optional(),
  }).transform((value, context) => {
    const items = value._embedded[key];
    const parsed = z.array(itemSchema).safeParse(items);
    if (!parsed.success) {
      context.addIssue({
        code: "custom",
        message: `Expected _embedded.${key} to contain an array`,
      });
      return z.NEVER;
    }
    return buildPaginated(parsed.data, value.count, value._links);
  }) as z.ZodType<Paginated<T>>;
}
