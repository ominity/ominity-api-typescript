/*
 * Tracking Events SDK.
 */

import { RequestOptions } from "../../lib/sdks.js";
import { Http } from "../http.js";

export type TrackingEventName =
  | "page_view"
  | "product_view"
  | "cart_view"
  | "add_to_cart"
  | "remove_from_cart"
  | "checkout_started"
  | "purchase"
  | "button_click"
  | string;

export type TrackingEventMetadata = Readonly<Record<string, unknown>>;
export type TrackingEventUtm = Readonly<Record<string, string>>;

export interface TrackEventRequest {
  readonly event: TrackingEventName;
  readonly timestamp?: string | Date;
  readonly title?: string;
  readonly url?: string;
  readonly metadata?: TrackingEventMetadata;
  readonly visitorId?: string;
  readonly userId?: number;
  readonly referrer?: string;
  readonly utm?: TrackingEventUtm;
}

export interface TrackEventResponse {
  readonly success: boolean;
  readonly visitorId: string;
}

type MutableTrackingPayload = {
  event: string;
  timestamp: string;
  title?: string;
  url?: string;
  metadata?: TrackingEventMetadata;
  visitorId?: string;
  userId?: number;
  referrer?: string;
  utm?: TrackingEventUtm;
};

function asNonEmptyString(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function asValidDate(value: Date): Date | undefined {
  if (!Number.isFinite(value.getTime())) {
    return;
  }

  return value;
}

function normalizeTimestamp(value: string | Date | undefined): string {
  if (value instanceof Date) {
    const parsed = asValidDate(value);
    if (parsed) {
      return parsed.toISOString();
    }
  } else if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed.length > 0) {
      return trimmed;
    }
  }

  return new Date().toISOString();
}

function normalizeUtm(value: unknown): TrackingEventUtm | undefined {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return;
  }

  const normalized: Record<string, string> = {};
  for (const [key, raw] of Object.entries(value)) {
    const trimmed = asNonEmptyString(raw);
    if (trimmed) {
      normalized[key] = trimmed;
    }
  }

  return Object.keys(normalized).length > 0 ? normalized : undefined;
}

function normalizeMetadata(value: unknown): TrackingEventMetadata | undefined {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return;
  }

  return value as TrackingEventMetadata;
}

function normalizeTrackEventPayload(input: TrackEventRequest): MutableTrackingPayload {
  const eventName = asNonEmptyString(input.event);
  if (!eventName) {
    throw new Error("Tracking event name is required.");
  }

  const payload: MutableTrackingPayload = {
    event: eventName,
    timestamp: normalizeTimestamp(input.timestamp),
  };

  const title = asNonEmptyString(input.title);
  if (title) {
    payload.title = title;
  }

  const url = asNonEmptyString(input.url);
  if (url) {
    payload.url = url;
  }

  const metadata = normalizeMetadata(input.metadata);
  if (metadata) {
    payload.metadata = metadata;
  }

  const visitorId = asNonEmptyString(input.visitorId);
  if (visitorId) {
    payload.visitorId = visitorId;
  }

  if (typeof input.userId === "number" && Number.isFinite(input.userId)) {
    payload.userId = Math.trunc(input.userId);
  }

  const referrer = asNonEmptyString(input.referrer);
  if (referrer) {
    payload.referrer = referrer;
  }

  const utm = normalizeUtm(input.utm);
  if (utm) {
    payload.utm = utm;
  }

  return payload;
}

function asRecord(value: unknown): Record<string, unknown> {
  if (typeof value === "object" && value !== null) {
    return value as Record<string, unknown>;
  }

  return {};
}

function normalizeTrackEventResponse(payload: unknown): TrackEventResponse {
  const record = asRecord(payload);
  const visitorId = asNonEmptyString(record["visitorId"]) ?? "";
  const success = record["success"] === true;

  return {
    success,
    visitorId,
  };
}

export class TrackingEvents {
  readonly #http: Http;

  constructor(http: Http) {
    this.#http = http;
  }

  async create(
    request: TrackEventRequest,
    options?: RequestOptions,
  ): Promise<TrackEventResponse> {
    const response = await this.#http.post("/tracking/events", {
      ...options,
      json: normalizeTrackEventPayload(request),
    });

    return normalizeTrackEventResponse(await response.json());
  }

  async track(
    request: TrackEventRequest,
    options?: RequestOptions,
  ): Promise<TrackEventResponse> {
    return this.create(request, options);
  }
}
