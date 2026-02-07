/*
 * Commerce Reviews SDK.
 */

import { reviewsList } from "../../funcs/commerce/reviewsList.js";
import { reviewsCreate } from "../../funcs/commerce/reviewsCreate.js";
import { reviewsGet } from "../../funcs/commerce/reviewsGet.js";
import { reviewsUpdate } from "../../funcs/commerce/reviewsUpdate.js";
import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import * as operations from "../../models/operations/index.js";
import { unwrapAsync } from "../../types/fp.js";

export class Reviews extends ClientSDK {
    /**
     * List reviews.
     */
    async list(
        request?: operations.ListReviewsRequest | undefined,
        options?: RequestOptions,
    ): Promise<operations.ListReviewsResponse> {
        return unwrapAsync(reviewsList(
            this,
            request,
            options,
        ));
    }

    /**
     * Create review.
     */
    async create(
        request: operations.CreateReviewRequest,
        options?: RequestOptions,
    ): Promise<operations.CreateReviewResponse> {
        return unwrapAsync(reviewsCreate(
            this,
            request,
            options,
        ));
    }

    /**
     * Get review.
     */
    async get(
        id: string,
        options?: RequestOptions & { include?: string },
    ): Promise<operations.GetReviewResponse> {
        return unwrapAsync(reviewsGet(
            this,
            { id, include: options?.include },
            options,
        ));
    }

    /**
     * Update review.
     */
    async update(
        id: string,
        data: Record<string, any>,
        options?: RequestOptions,
    ): Promise<operations.UpdateReviewResponse> {
        return unwrapAsync(reviewsUpdate(
            this,
            { id, data },
            options,
        ));
    }
}
