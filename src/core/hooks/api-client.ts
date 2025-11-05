//scaffold a react hook

import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { QueryClientProps } from "@/core/types/api-client";
import { fetchData } from "@/core/utils/fetch-data";

/**
 *
 * @param props {QueryClientProps}
 * @returns { data, isLoading, isError, error , queryClient }
 */
export const useApiClient = <T>(props: QueryClientProps) => {
  const apiUrl: string = import.meta.env.VITE_API_URL;
  const { path, queryParams, queryKeys, options } = props;

  let composedUrl = apiUrl;

  if (path) {
    composedUrl = [apiUrl].concat(...path).join("/");
  }

  if (queryParams) {
    const queryString = `?${Object.entries(queryParams)
      .map((q) => q.join("="))
      .join("&")}`;

    composedUrl = composedUrl.concat(queryString);
  }

  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = useQuery<T>({
    queryKey: [...queryKeys, composedUrl, options],
    queryFn: async () => fetchData(composedUrl, options),
  });

  return {
    queryClient,
    data,
    isLoading,
    isError,
    error,
  };
};
