import type { QueryClientProps } from "@/core/model/api-client";

export type QueryLayoutProps<T> = {
  queryClientOptions: QueryClientProps;
  children: (data: T) => React.ReactNode;
};
