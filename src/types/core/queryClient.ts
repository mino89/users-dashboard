type BaseQueryClientProps = {
  queryKeys: Array<string>;
  options?: RequestInit;
  path?: Array<string>;
  queryParams?: Record<string, string | number | boolean>;
};

export type RegularQueryClientProps = BaseQueryClientProps;

export type InfiniteQueryClientProps = BaseQueryClientProps & {
  initialPageParam: unknown;
  getNextPageParam: (
    lastPage: any,
    allPages: any[],
    lastPageParam: unknown,
    allPageParams: unknown[],
  ) => unknown;
  infinite: true;
  pageParamKey?: string;
};

export type QueryClientProps =
  | RegularQueryClientProps
  | InfiniteQueryClientProps;

export type DataExtractor<T, I> = (response: T) => I[];

export type RegularQueryProps<T> = {
  queryClientOptions: QueryClientProps;
  children: (data: T) => React.ReactNode;
};

export type InfiniteQueryProps<T, I> = {
  queryClientOptions: InfiniteQueryClientProps;
  children: (data: I[], loadMoreButton: React.ReactNode) => React.ReactNode;
  infinite: true;
  extractData: DataExtractor<T, I>;
};
