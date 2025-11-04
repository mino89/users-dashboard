export type QueryClientProps = {
  queryKeys: Array<string>;
  options?: RequestInit;
  path?: Array<string>;
  queryParams?: Record<string, string | number | boolean>;
};
