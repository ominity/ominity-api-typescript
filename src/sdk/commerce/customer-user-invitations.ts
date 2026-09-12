/*
 * Commerce customer user invitations SDK.
 */

import {
  customerUserInvitationsAccept,
  customerUserInvitationsCreate,
  customerUserInvitationsGet,
  customerUserInvitationsInspect,
  customerUserInvitationsList,
  customerUserInvitationsRevoke,
} from "../../funcs/commerce/index.js";
import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import * as operations from "../../models/operations/index.js";
import { unwrapAsync } from "../../types/fp.js";

export class CustomerUserInvitations extends ClientSDK {
  async create(
    request: operations.CreateCustomerUserInvitationRequest,
    options?: RequestOptions,
  ): Promise<operations.CreateCustomerUserInvitationResponse> {
    return unwrapAsync(customerUserInvitationsCreate(this, request, options));
  }

  async list(
    request: operations.ListCustomerUserInvitationsRequest,
    options?: RequestOptions,
  ): Promise<operations.ListCustomerUserInvitationsResponse> {
    return unwrapAsync(customerUserInvitationsList(this, request, options));
  }

  async get(
    request: operations.GetCustomerUserInvitationRequest,
    options?: RequestOptions,
  ): Promise<operations.GetCustomerUserInvitationResponse> {
    return unwrapAsync(customerUserInvitationsGet(this, request, options));
  }

  async revoke(
    request: operations.RevokeCustomerUserInvitationRequest,
    options?: RequestOptions,
  ): Promise<operations.RevokeCustomerUserInvitationResponse> {
    return unwrapAsync(customerUserInvitationsRevoke(this, request, options));
  }

  async inspect(
    request: operations.InspectCustomerUserInvitationRequest,
    options?: RequestOptions,
  ): Promise<operations.InspectCustomerUserInvitationResponse> {
    return unwrapAsync(customerUserInvitationsInspect(this, request, options));
  }

  async accept(
    request: operations.AcceptCustomerUserInvitationRequest,
    options?: RequestOptions,
  ): Promise<operations.AcceptCustomerUserInvitationResponse> {
    return unwrapAsync(customerUserInvitationsAccept(this, request, options));
  }
}
