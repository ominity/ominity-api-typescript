import assert from "node:assert/strict";
import test from "node:test";
import * as api from "../dist/esm/index.js";
import { ErrorResponse } from "../dist/esm/models/errors/index.js";
import { Subscription$inboundSchema } from "../dist/esm/models/index.js";

const noRetries = { retries: { strategy: "none" } };

const operationCases = [
  ["customersList", {}, "GET", "/commerce/customers"],
  ["customersGet", { id: 1 }, "GET", "/commerce/customers/1"],
  ["customersCreate", { data: { type: "private" } }, "POST", "/commerce/customers"],
  ["customersUpdate", { id: 1, data: { name: "Customer" } }, "PATCH", "/commerce/customers/1"],
  ["customerAddressesList", { customerId: 1 }, "GET", "/commerce/customers/1/addresses"],
  ["customerAddressesGet", { customerId: 1, id: 2 }, "GET", "/commerce/customers/1/addresses/2"],
  ["customerAddressesCreate", { customerId: 1, data: { street: "Main", number: "1", postalCode: "1000", city: "Brussels", country: "BE" } }, "POST", "/commerce/customers/1/addresses"],
  ["customerAddressesUpdate", { customerId: 1, id: 2, data: { city: "Ghent" } }, "PATCH", "/commerce/customers/1/addresses/2"],
  ["customerAddressesDelete", { customerId: 1, id: 2 }, "DELETE", "/commerce/customers/1/addresses/2"],
  ["customerGroupsList", { customerId: 1 }, "GET", "/commerce/customers/1/groups"],
  ["customerGroupsGet", { customerId: 1, id: 2 }, "GET", "/commerce/customers/1/groups/2"],
  ["customerMandatesList", { customerId: 1 }, "GET", "/commerce/customers/1/mandates"],
  ["customerMandatesGet", { customerId: 1, id: 2 }, "GET", "/commerce/customers/1/mandates/2"],
  ["customerMandatesCreate", { customerId: 1, data: {} }, "POST", "/commerce/customers/1/mandates"],
  ["customerMandatesUpdate", { customerId: 1, id: 2, data: {} }, "PATCH", "/commerce/customers/1/mandates/2"],
  ["customerMandatesDelete", { customerId: 1, id: 2 }, "DELETE", "/commerce/customers/1/mandates/2"],
  ["customerPaymentsList", { customerId: 1 }, "GET", "/commerce/customers/1/payments"],
  ["customerPaymentsGet", { customerId: 1, id: 2 }, "GET", "/commerce/customers/1/payments/2"],
  ["customerPaymentsCreate", { customerId: 1, data: { paymentmethodId: 3, redirectUrl: "https://example.test/return" } }, "POST", "/commerce/customers/1/payments"],
  ["customerPaymentsDelete", { customerId: 1, id: 2 }, "DELETE", "/commerce/customers/1/payments/2"],
  ["customerOrdersList", { customerId: 1 }, "GET", "/commerce/customers/1/orders"],
  ["customerOrdersGet", { customerId: 1, id: 2 }, "GET", "/commerce/customers/1/orders/2"],
  ["customerOrdersCreate", { customerId: 1, data: {} }, "POST", "/commerce/customers/1/orders"],
  ["customerOrdersUpdate", { customerId: 1, id: 2, data: {} }, "PATCH", "/commerce/customers/1/orders/2"],
  ["customerOrdersDelete", { customerId: 1, id: 2 }, "DELETE", "/commerce/customers/1/orders/2"],
  ["customerInvoicesList", { customerId: 1 }, "GET", "/commerce/customers/1/invoices"],
  ["customerInvoicesGet", { customerId: 1, id: 2 }, "GET", "/commerce/customers/1/invoices/2"],
  ["customerInvoicesDownloadPdf", { customerId: 1, id: 2 }, "GET", "/commerce/customers/1/invoices/2/pdf"],
  ["customerSubscriptionsList", { customerId: 1 }, "GET", "/commerce/customers/1/subscriptions"],
  ["customerSubscriptionsGet", { customerId: 1, id: 2 }, "GET", "/commerce/customers/1/subscriptions/2"],
  ["customerSubscriptionsCreate", { customerId: 1, data: {} }, "POST", "/commerce/customers/1/subscriptions"],
  ["customerSubscriptionsUpdate", { customerId: 1, id: 2, data: { paused: true } }, "PATCH", "/commerce/customers/1/subscriptions/2"],
  ["customerSubscriptionsDelete", { customerId: 1, id: 2 }, "DELETE", "/commerce/customers/1/subscriptions/2"],
  ["customerSubscriptionsRenew", { customerId: 1, id: 2 }, "POST", "/commerce/customers/1/subscriptions/2/renew"],
  ["customerSubscriptionsListTransitionProducts", { customerId: 1, subscriptionId: 2 }, "GET", "/commerce/customers/1/subscriptions/2/transition"],
  ["customerSubscriptionsGetTransitionProduct", { customerId: 1, subscriptionId: 2, productId: 3 }, "GET", "/commerce/customers/1/subscriptions/2/transition/3"],
  ["shippingClassesList", {}, "GET", "/commerce/shipping-classes"],
  ["shippingClassesGet", { id: 1 }, "GET", "/commerce/shipping-classes/1"],
  ["invoicesCreate", { data: {} }, "POST", "/commerce/invoices"],
  ["invoicesUpdate", { id: 1, data: {} }, "PATCH", "/commerce/invoices/1"],
  ["invoicesDownloadPdf", { id: 1 }, "GET", "/commerce/invoices/1/pdf"],
  ["paymentsList", {}, "GET", "/commerce/payments"],
  ["paymentsCreate", { data: { paymentmethodId: 3, redirectUrl: "https://example.test/return" } }, "POST", "/commerce/payments"],
  ["orderPaymentsCreate", { orderId: "1", data: { paymentmethodId: 3, redirectUrl: "https://example.test/return" } }, "POST", "/commerce/orders/1/payments"],
  ["orderPaymentsGet", { orderId: "1", id: 2 }, "GET", "/commerce/orders/1/payments/2"],
  ["productsOfferGet", { productId: 1, id: 2 }, "GET", "/commerce/products/1/offers/2"],
  ["cartShippingMethodsList", { cartId: "cart-id" }, "GET", "/commerce/carts/cart-id/shipping-methods"],
  ["componentFieldsList", { componentId: 1 }, "GET", "/cms/components/1/fields"],
  ["componentFieldsGet", { componentId: 1, id: 2 }, "GET", "/cms/components/1/fields/2"],
  ["pageComponentsGet", { pageId: 1, id: 2 }, "GET", "/cms/pages/1/components/2"],
  ["pageComponentFieldsGet", { pageId: 1, pageComponentId: 2, id: 3 }, "GET", "/cms/pages/1/components/2/fields/3"],
  ["cmsRoutesList", {}, "GET", "/cms/routes"],
  ["cmsRoutesGet", { id: 1 }, "GET", "/cms/routes/1"],
  ["settingCustomerGroupsList", {}, "GET", "/settings/customer-groups"],
  ["settingCustomerGroupsGet", { id: 1 }, "GET", "/settings/customer-groups/1"],
  ["paymentMethodIssuersList", { methodId: 1 }, "GET", "/settings/paymentmethods/1/issuers"],
  ["paymentMethodIssuersGet", { methodId: 1, id: 2 }, "GET", "/settings/paymentmethods/1/issuers/2"],
  ["configuredLanguagesList", {}, "GET", "/settings/languages"],
  ["mediaLibraryList", {}, "GET", "/media-library"],
  ["mediaLibraryFoldersList", {}, "GET", "/media-library/folders"],
  ["mediaLibraryFoldersCreate", { data: { name: "folder" } }, "POST", "/media-library/folders"],
  ["mediaLibraryUploadsPresign", { data: { filename: "image.jpg", mimeType: "image/jpeg", size: 100 } }, "POST", "/media-library/uploads/presign"],
  ["mediaLibraryItemsDelete", { data: { path: "image.jpg", type: "file" } }, "DELETE", "/media-library/items"],
  ["mediaLibraryItemsMove", { data: { path: "image.jpg", type: "file", targetPath: "archive/image.jpg" } }, "PATCH", "/media-library/items/move"],
  ["mediaLibraryItemsRename", { data: { path: "image.jpg", type: "file", newName: "cover.jpg" } }, "PATCH", "/media-library/items/rename"],
  ["mediaLibrarySearch", { q: "image" }, "GET", "/media-library/search"],
  ["mediaLibrarySource", { path: "image.jpg" }, "GET", "/media-library/items/source"],
  ["mediaLibraryDownload", { data: { items: [{ path: "image.jpg", type: "file" }] } }, "POST", "/media-library/downloads"],
  ["translationsBulk", { data: { source_language: "en", target_languages: ["nl"], fields: [{ key: "title", source: "Hello" }] } }, "POST", "/translations/bulk"],
];

test("all added core operations construct the registered API method and path", async () => {
  const seen = [];
  const client = new api.OminityCore({
    serverURL: "https://example.test/api",
    httpClient: new api.HTTPClient({
      fetcher: async (request) => {
        seen.push(request);
        return new Response("failure", { status: 500, headers: { "content-type": "text/plain" } });
      },
    }),
  });

  for (const [name, request, method, path] of operationCases) {
    const operation = api[name];
    assert.equal(typeof operation, "function", `${name} is exported`);
    const [, call] = await operation(client, request, noRetries).$inspect();
    assert.equal(call.status, "complete", `${name} reached the transport`);
    assert.equal(call.request.method, method, `${name} method`);
    assert.equal(new URL(call.request.url).pathname, `/api/v1${path}`, `${name} path`);
  }

  assert.equal(seen.length, operationCases.length);
  assert.equal(operationCases.length, 69);
});

test("new operations encode deep filters, parse pagination, JSON bodies, and bytes", async () => {
  const seen = [];
  const responses = [
    new Response(JSON.stringify({
      _embedded: { customers: [{
        resource: "customer", id: 7, type: "business", name: "Acme", email: "billing@acme.test", phone: null,
        companyVat: null, billingAddress: null, shippingAddress: null, isTaxExempt: false, isGuest: false,
        ownerId: 2, updatedAt: "2026-09-13T00:00:00Z", createdAt: "2026-09-13T00:00:00Z",
      }] }, count: 1,
    }), { status: 200, headers: { "content-type": "application/hal+json" } }),
    new Response(null, { status: 204 }),
    new Response(new Uint8Array([37, 80, 68, 70]), { status: 200, headers: { "content-type": "application/pdf" } }),
    new Response(JSON.stringify({ translations: { nl: { title: "Hallo" } }, skipped: { nl: {} } }), { status: 200, headers: { "content-type": "application/json" } }),
  ];
  const sdk = new api.Ominity({
    serverURL: "https://example.test/api",
    httpClient: new api.HTTPClient({ fetcher: async (request) => {
      seen.push({ url: request.url, method: request.method, body: await request.clone().text() });
      return responses.shift();
    } }),
  });

  const customers = await sdk.commerce.customers.list({ filter: { name: "Acme & Sons" }, page: 2, limit: 25 });
  assert.equal(customers.items[0]?.id, 7);
  assert.equal(customers.page, 2);
  assert.match(seen[0].url, /filter%5Bname%5D=Acme%20%26%20Sons/);
  await sdk.commerce.customerAddresses.delete({ customerId: 7, id: 3 });
  assert.equal(seen[1].method, "DELETE");
  assert.deepEqual([...await sdk.commerce.invoices.downloadPdf({ id: 12 })], [37, 80, 68, 70]);
  const translated = await sdk.translations.bulk({ data: { source_language: "en", target_languages: ["nl"], fields: [{ key: "title", source: "Hello" }] } });
  assert.equal(translated.translations.nl?.title, "Hallo");
  assert.deepEqual(JSON.parse(seen[3].body), { source_language: "en", target_languages: ["nl"], fields: [{ key: "title", source: "Hello" }] });
});

test("Subscription parses the corrected productId field", () => {
  const parsed = Subscription$inboundSchema.parse({
    resource: "subscription", id: 1, customerId: 2, productId: 3, intervalId: 4, status: "active",
    firstAmount: { value: "10.00", currency: "EUR" }, recurringAmount: { value: "10.00", currency: "EUR" },
    currentPeriod: { startedAt: "", endsAt: "", daysLeft: 30 }, isPausable: true, expiresAt: null, dueAt: null,
    updatedAt: "2026-09-13T00:00:00Z", createdAt: "2026-09-13T00:00:00Z",
  });
  assert.equal(parsed.productId, 3);
});

test("user action endpoints parse application/json responses and errors", async () => {
  const responses = [
    { status: 200, body: { success: true } },
    { status: 200, body: { success: true } },
    { status: 200, body: { success: true } },
    { status: 200, body: { success: true, message: "Recovery code validated" } },
    {
      status: 200,
      body: {
        success: true,
        message: "Password reset link send to users email.",
        expiresAt: "2026-09-14T10:30:00Z",
        createdAt: "2026-09-14T10:00:00Z",
      },
    },
    {
      status: 200,
      body: {
        success: true,
        message: "Password reset successfully.",
        updatedAt: "2026-09-14T10:05:00Z",
      },
    },
    {
      status: 422,
      body: {
        status: 422,
        title: "Unprocessable Content",
        detail: "The code field is required.",
        _links: {
          documentation: {
            href: "https://docs.ominity.com/overview/handling-errors",
            type: "text/html",
          },
        },
      },
    },
  ];
  const sdk = new api.Ominity({
    serverURL: "https://example.test/api",
    httpClient: new api.HTTPClient({
      fetcher: async () => {
        const response = responses.shift();
        assert.ok(response, "a mocked response is available");
        return new Response(JSON.stringify(response.body), {
          status: response.status,
          headers: { "content-type": "application/json" },
        });
      },
    }),
  });

  assert.deepEqual(await sdk.users.mfaMethods.send({ id: 7, method: "email" }), { success: true });
  assert.deepEqual(await sdk.users.mfaMethods.validate({ id: 7, method: "email", code: "123456" }), { success: true });
  assert.deepEqual(await sdk.users.mfaMethods.disable({ id: 7, method: "email" }), { success: true });
  assert.deepEqual(
    await sdk.users.recoveryCodes.validate({ id: 7, code: "recovery-code" }),
    { success: true, message: "Recovery code validated" },
  );
  assert.equal(
    (await sdk.users.sendPasswordResetLink({
      email: "person@example.test",
      redirectUrl: "https://example.test/reset-password",
    })).expiresAt,
    "2026-09-14T10:30:00Z",
  );
  assert.equal(
    (await sdk.users.resetPassword({
      email: "person@example.test",
      token: "reset-token",
      password: "new-password",
    })).updatedAt,
    "2026-09-14T10:05:00Z",
  );

  await assert.rejects(
    sdk.users.mfaMethods.send({ id: 7, method: "email" }),
    (error) => error instanceof ErrorResponse
      && error.status === 422
      && error.detail === "The code field is required.",
  );
});

test("existing subscription interval and VAT helpers use the registered routes", async () => {
  const seen = [];
  const sdk = new api.Ominity({
    serverURL: "https://example.test/api",
    httpClient: new api.HTTPClient({
      fetcher: async (request) => {
        seen.push(request.url);
        return new Response("failure", { status: 500, headers: { "content-type": "text/plain" } });
      },
    }),
  });

  await assert.rejects(sdk.commerce.subscriptionIntervals.list({}, noRetries));
  await assert.rejects(sdk.commerce.subscriptionIntervals.get({ id: 4 }, noRetries));
  await assert.rejects(sdk.commerce.vatValidations.get("BE0123456789", noRetries));

  assert.deepEqual(seen.map((url) => new URL(url).pathname), [
    "/api/v1/commerce/subscriptions/intervals",
    "/api/v1/commerce/subscriptions/intervals/4",
    "/api/v1/commerce/vatvalidations/BE0123456789",
  ]);
});
