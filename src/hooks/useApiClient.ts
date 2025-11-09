import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  QueryClientProps,
  InfiniteQueryClientProps,
} from "@type/core/queryClient";
import { fetchData } from "@utils/fetchData";
import {
  buildUrl,
  type InfiniteQueryResult,
  isInfiniteQuery,
  type RegularQueryResult,
} from "@utils/queryClient";

function createInfiniteQueryFn<T>(
  baseUrl: string,
  pageParamKey: string,
  options: RequestInit,
) {
  return async ({ pageParam }: { pageParam: unknown }) => {
    let composedUrl = baseUrl;

    if (pageParam !== undefined && pageParam !== null) {
      const separator = composedUrl.includes("?") ? "&" : "?";
      composedUrl = `${composedUrl}${separator}${pageParamKey}=${pageParam}`;
    }

    return fetchData<T>(composedUrl, options);
  };
}

function executeInfiniteQuery<T>(
  props: InfiniteQueryClientProps,
  baseUrl: string,
  queryKeys: string[],
  options: RequestInit,
  queryClient: ReturnType<typeof useQueryClient>,
): InfiniteQueryResult<T> {
  const { initialPageParam, getNextPageParam, pageParamKey = "skip" } = props;

  const infiniteQueryFn = createInfiniteQueryFn<T>(
    baseUrl,
    pageParamKey,
    options,
  );

  const result = useInfiniteQuery<T, Error>({
    queryKey: [...queryKeys, baseUrl, options],
    queryFn: infiniteQueryFn,
    initialPageParam,
    getNextPageParam,
  });

  return {
    queryClient,
    ...result,
  } as InfiniteQueryResult<T>;
}

function executeRegularQuery<T>(
  composedUrl: string,
  queryKeys: string[],
  options: RequestInit,
  queryClient: ReturnType<typeof useQueryClient>,
): RegularQueryResult<T> {
  const result = useQuery<T>({
    queryKey: [...queryKeys, composedUrl, options],
    queryFn: async () => fetchData(composedUrl, options),
  });

  return {
    queryClient,
    ...result,
  } as RegularQueryResult<T>;
}

export function useApiClient<T>(
  props: QueryClientProps,
): RegularQueryResult<T> | InfiniteQueryResult<T> {
  const apiUrl: string = import.meta.env.VITE_API_URL;
  const { path, queryParams, queryKeys, options = {} } = props;
  const queryClient = useQueryClient();

  if (isInfiniteQuery(props)) {
    const baseUrl = buildUrl(apiUrl, path, queryParams);
    return executeInfiniteQuery<T>(
      props,
      baseUrl,
      queryKeys,
      options,
      queryClient,
    );
  } else {
    const composedUrl = buildUrl(apiUrl, path, queryParams);
    return executeRegularQuery<T>(composedUrl, queryKeys, options, queryClient);
  }
}
