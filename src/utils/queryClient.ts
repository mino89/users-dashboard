import {
  QueryClient,
  useQueryClient,
  type UseInfiniteQueryResult,
  type UseQueryResult,
} from "@tanstack/react-query";
import type {
  QueryClientProps,
  InfiniteQueryClientProps,
} from "@type/core/queryClient";

export const queryClient = new QueryClient();

export type RegularQueryResult<T> = UseQueryResult<T, Error> & {
  queryClient: ReturnType<typeof useQueryClient>;
};

export type InfiniteQueryResult<T> = UseInfiniteQueryResult<T, Error> & {
  queryClient: ReturnType<typeof useQueryClient>;
};

export function isInfiniteQuery(
  props: QueryClientProps,
): props is InfiniteQueryClientProps {
  return "infinite" in props && props.infinite === true;
}

export function buildUrl(
  apiUrl: string,
  path?: Array<string>,
  queryParams?: Record<string, string | number | boolean>,
): string {
  let composedUrl = apiUrl;

  if (path && path.length > 0) {
    composedUrl = [apiUrl, ...path].join("/");
  }

  if (queryParams && Object.keys(queryParams).length > 0) {
    const queryString = `?${Object.entries(queryParams)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&")}`;
    composedUrl = composedUrl.concat(queryString);
  }

  return composedUrl;
}
