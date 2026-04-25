/*
 * Channel model.
 */

import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import { Currency, Currency$inboundSchema } from "../commerce/currency.js";
import { ShippingMethod, ShippingMethod$inboundSchema } from "../commerce/shipping-method.js";
import { HalLinks, HalLinks$inboundSchema } from "../hal.js";
import { Language, Language$inboundSchema } from "../localization/language.js";
import { buildPaginated, Paginated } from "../pagination.js";
import { Country, Country$inboundSchema } from "../settings/country.js";
import { PaymentMethod, PaymentMethod$inboundSchema } from "../settings/payment-method.js";
import { ChannelDomain, ChannelDomain$inboundSchema } from "./channel-domain.js";
import {
  ChannelSystemSetting,
  ChannelSystemSetting$inboundSchema,
} from "./channel-system-setting.js";
import { ChannelType, ChannelType$inboundSchema } from "./channel-type.js";

export type Channel = {
  resource: "channel";
  id: number;
  typeId: number;
  name: string;
  identifier: string;
  defaultLanguageId?: number | null;
  defaultCountryId?: number | null;
  defaultCurrencyId?: number | null;
  defaultPaymentMethodId?: number | null;
  defaultShippingMethodId?: string | null;
  hreflangDefaultDomainId?: number | null;
  taxCalculationType?: string | null;
  bindCustomersToChannel: boolean;
  isActive: boolean;
  isMaintenance: boolean;
  maintenanceIpWhitelist?: string[];
  configuration?: Record<string, unknown> | unknown[];
  updatedAt?: string;
  createdAt?: string;
  deletedAt?: string | null;
  links?: HalLinks;
  type?: ChannelType;
  domains?: ChannelDomain[];
  hreflangDefaultDomain?: ChannelDomain | null;
  defaultLanguage?: Language | null;
  defaultCountry?: Country | null;
  defaultCurrency?: Currency | null;
  defaultPaymentMethod?: PaymentMethod | null;
  defaultShippingMethod?: ShippingMethod | null;
  languages?: Language[];
  countries?: Country[];
  currencies?: Currency[];
  paymentMethods?: PaymentMethod[];
  shippingMethods?: ShippingMethod[];
  systemSettings?: ChannelSystemSetting[];
};

/** @internal */
export const Channel$inboundSchema: z.ZodType<Channel> = z.object({
  resource: z.literal("channel"),
  id: z.number().int(),
  typeId: z.number().int(),
  name: z.string(),
  identifier: z.string(),
  defaultLanguageId: z.number().int().nullable().optional(),
  defaultCountryId: z.number().int().nullable().optional(),
  defaultCurrencyId: z.number().int().nullable().optional(),
  defaultPaymentMethodId: z.number().int().nullable().optional(),
  defaultShippingMethodId: z.string().nullable().optional(),
  hreflangDefaultDomainId: z.number().int().nullable().optional(),
  taxCalculationType: z.string().nullable().optional(),
  bindCustomersToChannel: z.boolean(),
  isActive: z.boolean(),
  isMaintenance: z.boolean(),
  maintenanceIpWhitelist: z.array(z.string()).optional(),
  configuration: z.union([z.record(z.string(), z.any()), z.array(z.any())])
    .optional(),
  updatedAt: z.string().optional(),
  createdAt: z.string().optional(),
  deletedAt: z.string().nullable().optional(),
  _links: HalLinks$inboundSchema.optional(),
  _embedded: z.object({
    type: z.lazy(() => ChannelType$inboundSchema).optional(),
    domains: z.array(z.lazy(() => ChannelDomain$inboundSchema)).optional(),
    hreflang_default_domain: z.lazy(() => ChannelDomain$inboundSchema).nullable()
      .optional(),
    default_language: z.lazy(() => Language$inboundSchema).nullable().optional(),
    default_country: z.lazy(() => Country$inboundSchema).nullable().optional(),
    default_currency: z.lazy(() => Currency$inboundSchema).nullable().optional(),
    default_payment_method: z.lazy(() => PaymentMethod$inboundSchema).nullable()
      .optional(),
    default_shipping_method: z.lazy(() => ShippingMethod$inboundSchema)
      .nullable().optional(),
    languages: z.array(z.lazy(() => Language$inboundSchema)).optional(),
    countries: z.array(z.lazy(() => Country$inboundSchema)).optional(),
    currencies: z.array(z.lazy(() => Currency$inboundSchema)).optional(),
    payment_methods: z.array(z.lazy(() => PaymentMethod$inboundSchema))
      .optional(),
    shipping_methods: z.array(z.lazy(() => ShippingMethod$inboundSchema))
      .optional(),
    system_settings: z.array(z.lazy(() => ChannelSystemSetting$inboundSchema))
      .optional(),
  }).optional(),
})
  .loose()
  .transform((v) => {
    const out = remap$(v, { _links: "links" }) as Channel;
    const embedded = v["_embedded"];
    if (embedded?.type) {
      out.type = embedded.type;
    }
    if (embedded?.domains) {
      out.domains = embedded.domains;
    }
    if (typeof embedded?.hreflang_default_domain !== "undefined") {
      out.hreflangDefaultDomain = embedded.hreflang_default_domain;
    }
    if (typeof embedded?.default_language !== "undefined") {
      out.defaultLanguage = embedded.default_language;
    }
    if (typeof embedded?.default_country !== "undefined") {
      out.defaultCountry = embedded.default_country;
    }
    if (typeof embedded?.default_currency !== "undefined") {
      out.defaultCurrency = embedded.default_currency;
    }
    if (typeof embedded?.default_payment_method !== "undefined") {
      out.defaultPaymentMethod = embedded.default_payment_method;
    }
    if (typeof embedded?.default_shipping_method !== "undefined") {
      out.defaultShippingMethod = embedded.default_shipping_method;
    }
    if (embedded?.languages) {
      out.languages = embedded.languages;
    }
    if (embedded?.countries) {
      out.countries = embedded.countries;
    }
    if (embedded?.currencies) {
      out.currencies = embedded.currencies;
    }
    if (embedded?.payment_methods) {
      out.paymentMethods = embedded.payment_methods;
    }
    if (embedded?.shipping_methods) {
      out.shippingMethods = embedded.shipping_methods;
    }
    if (embedded?.system_settings) {
      out.systemSettings = embedded.system_settings;
    }
    return out;
  });

export type ChannelsListResponse = Paginated<Channel>;

/** @internal */
export const ChannelsListResponse$inboundSchema: z.ZodType<
  ChannelsListResponse
> = z.object({
  _embedded: z.object({
    channels: z.array(Channel$inboundSchema),
  }),
  count: z.number(),
  _links: HalLinks$inboundSchema.optional(),
}).transform((v) => buildPaginated(v._embedded.channels, v.count, v["_links"]));
