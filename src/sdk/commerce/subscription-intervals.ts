/*
 * Commerce Subscription Intervals SDK.
 */

import { subscriptionIntervalsList } from "../../funcs/commerce/subscriptionIntervalsList.js";
import { subscriptionIntervalsGet } from "../../funcs/commerce/subscriptionIntervalsGet.js";
import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import * as operations from "../../models/operations/index.js";
import { unwrapAsync } from "../../types/fp.js";

export class SubscriptionIntervals extends ClientSDK {
    async list(
        request?: operations.ListSubscriptionIntervalsRequest | undefined,
        options?: RequestOptions,
    ): Promise<operations.ListSubscriptionIntervalsResponse> {
        return unwrapAsync(subscriptionIntervalsList(this, request, options));
    }

    async get(
        request: operations.GetSubscriptionIntervalRequest,
        options?: RequestOptions,
    ): Promise<operations.GetSubscriptionIntervalResponse> {
        return unwrapAsync(subscriptionIntervalsGet(this, request, options));
    }
}
