import type { QueryClientProps } from "@/core/types/api-client";

export type QueryLayoutProps<T> = {
  queryClientOptions: QueryClientProps;
  children: (data: T) => React.ReactNode;
};
