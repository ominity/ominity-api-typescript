# AGENT.md

This file defines the expected working rules for agents editing `@ominity/api-typescript`.

## Goal

Keep the SDK consistent. New or updated endpoints must follow the existing architecture and typing model instead of introducing one-off patterns.

## Architecture

The package is split into four layers:

- `src/models/*`
  Domain models and reusable response schemas.
- `src/models/operations/*`
  Endpoint-specific request and response types plus Zod schemas.
- `src/funcs/*`
  Standalone HTTP functions that build requests, encode query/body data, run matchers, and return `APIPromise<Result<...>>`.
- `src/sdk/*`
  Thin SDK wrappers that expose class methods and call `unwrapAsync(...)` over the matching function.

When adding a new endpoint, update all relevant layers unless the endpoint fits an existing model and SDK surface exactly.

## Required Workflow

For every endpoint change:

1. Inspect the backend route/controller/resource behavior first.
2. Confirm:
   - path
   - HTTP method
   - path params
   - query params
   - request body shape
   - response body shape
   - status codes
   - content type
3. Reuse existing models where possible.
4. Add or update operation types in `src/models/operations`.
5. Add or update the standalone function in `src/funcs`.
6. Add or update the SDK wrapper in `src/sdk`.
7. Update exports.
8. Run:
   - `npm run lint`
   - `npm run build`

## Models

Model rules:

- Prefer reusing an existing model over creating a near-duplicate.
- Do not introduce duplicate route, HAL, relation, or pagination models.
- Put reusable domain objects in `src/models/{domain}`.
- Keep inbound schema transforms aligned with the API payload. Do not rename fields unless the SDK already uses that rename convention.
- Use passthrough models only when the response is intentionally open-ended.
- For dynamic CMS entry-like resources, prefer generic models such as `ContentEntry<TFields>`.

## Operations

Operation files in `src/models/operations` should define:

- request types
- response types
- outbound request schemas
- inbound response schemas

Rules:

- Keep request shapes ergonomic for SDK consumers, but consistent with the rest of the package.
- Use strong typing when the backend shape is stable.
- Use `Record<string, any>` only when the backend intentionally accepts open-ended objects.
- For generic list/get/create/update CMS content APIs, preserve generic response typing if it already exists.

## Functions

Function files in `src/funcs/{domain}` must follow neighboring patterns.

Required structure:

- validate input with `safeParse(...)`
- build path
- encode query/body
- resolve security
- build request context
- call `client._createRequest(...)`
- call `client._do(...)`
- match response with `M.match(...)`
- return `APIPromise<Result<...>>`

Rules:

- Do not invent a new request lifecycle if a domain already has an established one.
- Keep `operationID` naming consistent with the module, for example `cms.content.list`.
- Keep content type matching explicit where the package already expects `application/hal+json`.
- Keep parsing and transformation behavior unchanged unless the backend contract requires a change.

## SDK Wrappers

SDK class methods should stay thin.

Rules:

- SDK methods should call the standalone function and `unwrapAsync(...)`.
- Do not move HTTP logic into SDK classes.
- Keep method names aligned with existing patterns such as `list`, `get`, `create`, `update`, `delete`.
- If an API surface is dynamic by resource type, prefer a generic wrapper like `sdk.cms.content`.

## Query Encoding Rules

This package already has the correct query helpers in:

- `src/lib/encodings.ts`

Agents must use the right encoder for the right job.

### Flexible filters are the default for list endpoints

If the backend accepts arbitrary filters, do not hardcode only one filter field such as `filterId`.

Use this request shape:

```ts
filter?: Record<string, any> | undefined;
```

And encode it like this:

```ts
const baseQuery = encodeFormQuery({
  sort: payload.sort,
  page: payload.page,
  limit: payload.limit,
});

const filterQuery = payload.filter != null
  ? encodeDeepObjectQuery({ filter: payload.filter })
  : undefined;

const query = queryJoin(baseQuery, filterQuery);
```

That must produce query params like:

- `filter[id]=1,8,9`
- `filter[slug]=something-here`
- `filter[resource_key]=posts`

This is a requirement for flexible list endpoints. Do not regress back to `filterId`, `filterSlug`, or similar one-off fields unless the endpoint is intentionally constrained and the existing SDK pattern for that exact endpoint family already uses dedicated fields.

### When to use dedicated filter fields

Dedicated fields such as `filterSlug` or `filterPublished` are acceptable only when all of the following are true:

- the endpoint already follows that established pattern in the SDK
- the backend filter surface is intentionally narrow
- keeping the existing public API is more important than generalizing it

If you are adding a new list endpoint and the backend supports multiple arbitrary filter keys, use a flexible `filter` object.

### Other query params

Use `encodeFormQuery(...)` for:

- `include`
- `sort`
- `page`
- `limit`
- other flat query params

Use `encodeDeepObjectQuery(...)` for:

- nested `filter` objects
- other deep object query structures

Use `queryJoin(...)` to merge separately encoded query fragments.

## Paths

Path rules:

- Match backend routes exactly.
- Use nested resource paths when the backend requires parent context.
- Do not flatten nested resources in the SDK if the backend route is nested.
- URL-encode dynamic path segments.

## Exports

When adding a new file, update exports where needed:

- `src/funcs/{domain}/index.ts`
- `src/funcs/index.ts`
- `src/models/{domain}/index.ts`
- `src/models/index.ts`
- `src/models/operations/index.ts`
- `src/sdk/{domain}/index.ts`

Do not leave new modules unreachable.

## Runtime Config

Current runtime config rule:

- `language` can be changed after SDK initialization via `setLanguage(...)`
- `channelId` is initialization-time config only and must not gain a runtime setter unless explicitly requested

Do not reintroduce a runtime `setChannelId(...)` API without a deliberate requirement.

## Verification

Every endpoint/model/function change must finish with:

```sh
npm run lint
npm run build
```

Do not claim the change is complete if either command fails.

## Practical Checklist

Before finishing, verify:

- endpoint paths match backend routes exactly
- request types match backend expectations
- list filters are flexible when the backend supports arbitrary filters
- response schemas match the actual payload shape
- new files are exported
- SDK wrapper methods exist where needed
- lint passes
- build passes
