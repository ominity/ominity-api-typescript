/*
 * Commerce Orders SDK.
 */

import { ordersList } from "../../funcs/commerce/ordersList.js";
import { ordersCreate } from "../../funcs/commerce/ordersCreate.js";
import { ordersGet } from "../../funcs/commerce/ordersGet.js";
import { ordersUpdate } from "../../funcs/commerce/ordersUpdate.js";
import { ordersPaymentsList } from "../../funcs/commerce/ordersPaymentsList.js";
import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import * as operations from "../../models/operations/index.js";
import { unwrapAsync } from "../../types/fp.js";

export class Orders extends ClientSDK {
    /**
     * List orders.
     */
    async list(
        request?: operations.ListOrdersRequest | undefined,
        options?: RequestOptions,
    ): Promise<operations.ListOrdersResponse> {
        return unwrapAsync(ordersList(
            this,
            request,
            options,
        ));
    }

    /**
     * Create order.
     */
    async create(
        request: operations.CreateOrderRequest,
        options?: RequestOptions,
    ): Promise<operations.CreateOrderResponse> {
        return unwrapAsync(ordersCreate(
            this,
            request,
            options,
        ));
    }

    /**
     * Get order.
     */
    async get(
        id: string,
        options?: RequestOptions & { include?: string },
    ): Promise<operations.GetOrderResponse> {
        return unwrapAsync(ordersGet(
            this,
            { id, include: options?.include },
            options,
        ));
    }

    /**
     * Update order.
     */
    async update(
        id: string,
        data: Record<string, any>,
        options?: RequestOptions,
    ): Promise<operations.UpdateOrderResponse> {
        return unwrapAsync(ordersUpdate(
            this,
            { id, data },
            options,
        ));
    }

    /**
     * List order payments.
     */
    async listPayments(
        orderId: string,
        request?: operations.ListOrderPaymentsRequest | undefined,
        options?: RequestOptions,
    ): Promise<operations.ListOrderPaymentsResponse> {
        return unwrapAsync(ordersPaymentsList(
            this,
            { ...request, orderId },
            options,
        ));
    }
}
