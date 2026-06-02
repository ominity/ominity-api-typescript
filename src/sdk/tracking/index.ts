/*
 * SDK module: Tracking
 */

import { Http } from "../http.js";
import { TrackingEvents } from "./events.js";

export {
  TrackingEvents,
};
export type {
  TrackEventRequest,
  TrackEventResponse,
  TrackingEventMetadata,
  TrackingEventName,
  TrackingEventUtm,
} from "./events.js";

export class Tracking {
  readonly #http: Http;

  constructor(http: Http) {
    this.#http = http;
  }

  private _events?: TrackingEvents;
  get events(): TrackingEvents {
    return (this._events ??= new TrackingEvents(this.#http));
  }

  async track(...args: Parameters<TrackingEvents["track"]>): ReturnType<TrackingEvents["track"]> {
    return this.events.track(...args);
  }
}
