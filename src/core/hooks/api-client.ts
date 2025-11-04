//scaffold a react hook

import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { QueryClientProps } from "@/core/model/api-client";
import { fetchData } from "@/core/utils/fetch-data";

/**
 *
 * @param props {QueryClientProps}
 * @returns { data, isLoading, isError, error , queryClient }
 */
export const useApiClient = <T>(props: QueryClientProps) => {
  const apiUrl: string = import.meta.env.VITE_API_URL;
  let composedUrl = apiUrl;
  if (props.path) {
    composedUrl = [apiUrl].concat(...props.path).join("/");
  }

  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = useQuery<T>({
    queryKey: [...props.queryKeys, composedUrl, props.options],
    queryFn: async () => fetchData(composedUrl, props.options),
  });

  return {
    queryClient,
    data,
    isLoading,
    isError,
    error,
  };
};
