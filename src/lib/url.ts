
const hasOwn = Object.prototype.hasOwnProperty;

export type Params = Partial<Record<string, string | number>>;

export function pathToFunc(
  pathPattern: string,
  options?: { charEncoding?: "percent" | "none" },
): (params?: Params) => string {
  const paramRE = /\{([a-zA-Z0-9_][a-zA-Z0-9_-]*?)\}/g;

  return function buildURLPath(params: Record<string, unknown> = {}): string {
    return pathPattern.replace(paramRE, function (_, placeholder) {
      if (!hasOwn.call(params, placeholder)) {
        throw new Error(`Parameter '${placeholder}' is required`);
      }

      const value = params[placeholder];
      if (typeof value !== "string" && typeof value !== "number") {
        throw new Error(
          `Parameter '${placeholder}' must be a string or number`,
        );
      }

      return options?.charEncoding === "percent"
        ? encodeURIComponent(`${value}`)
        : `${value}`;
    });
  };
}

/**
 * Returns a copy of a base URL with the configured API version suffix removed.
 * Useful for endpoints that are mounted outside `/api/{version}`.
 */
export function baseURLWithoutAPIVersion(
  baseURL: string | URL | null | undefined,
  apiVersion: string | undefined,
): URL | undefined {
  if (!baseURL) {
    return undefined;
  }

  const normalizedVersion = apiVersion ?? "v1";
  const url = new URL(baseURL.toString());

  const pathname = url.pathname.replace(/\/+$/, "");
  const versionSuffix = normalizedVersion ? `/${normalizedVersion}` : "";

  if (versionSuffix && pathname.endsWith(versionSuffix)) {
    const nextPath = pathname.slice(0, -versionSuffix.length);
    url.pathname = `${nextPath || "/"}`;
  } else {
    url.pathname = `${pathname || "/"}`;
  }

  if (!url.pathname.endsWith("/")) {
    url.pathname = `${url.pathname}/`;
  }

  return url;
}
