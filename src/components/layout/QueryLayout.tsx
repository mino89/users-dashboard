import { useApiClient } from "@hooks/useApiClient";
import Error from "../ui/Error";
import Loading from "@components/ui/Loading";
import styles from "./QueryLayout.module.css";
import type {
    DataExtractor,
    RegularQueryProps,
    InfiniteQueryProps,
} from "@type/core/queryClient";

function extractDataFromPage<T, I>(
    page: T,
    extractor: DataExtractor<T, I>,
): I[] {
    return extractor(page);
}

function isInfiniteQuery<T, I>(
    props: RegularQueryProps<T> | InfiniteQueryProps<T, I>,
): props is InfiniteQueryProps<T, I> {
    return "infinite" in props && props.infinite === true;
}

function RegularQuery<T>({
    queryClientOptions,
    children,
}: RegularQueryProps<T>) {
    const result = useApiClient<T>(queryClientOptions);

    if (result.isLoading) return <Loading />;
    if (result.isError)
        return (
            <Error message={result.error?.message || "An error occurred."} />
        );
    if (result.data) return <>{children(result.data)}</>;
    return null;
}

function InfiniteQuery<T, I>({
    queryClientOptions,
    children,
    extractData,
}: InfiniteQueryProps<T, I>) {
    const result = useApiClient<T>(queryClientOptions) as any;

    if (result.isLoading) return <Loading />;
    if (result.isError)
        return (
            <Error message={result.error?.message || "An error occurred."} />
        );

    if (result.data && result.data.pages) {
        const allData = result.data.pages.flatMap((page: T) =>
            extractDataFromPage<T, I>(page, extractData),
        );

        const loadMoreButton = (
            <div className={styles.loadMoreContainer}>
                {result.hasNextPage && (
                    <button
                        onClick={() => result.fetchNextPage()}
                        disabled={result.isFetchingNextPage}
                        className={styles.loadMoreButton}
                    >
                        {result.isFetchingNextPage ? "Loading..." : "Load More"}
                    </button>
                )}

                {!result.hasNextPage && allData.length > 0 && (
                    <p className={styles.endMessage}>No more items to load</p>
                )}
            </div>
        );

        return <>{children(allData, loadMoreButton)}</>;
    }

    return null;
}

export default function QueryLayout<T, I = never>(
    props: RegularQueryProps<T> | InfiniteQueryProps<T, I>,
) {
    if (isInfiniteQuery(props)) {
        return <InfiniteQuery {...props} />;
    }

    return <RegularQuery {...props} />;
}
