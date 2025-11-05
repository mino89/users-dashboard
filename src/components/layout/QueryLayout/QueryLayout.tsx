import { useApiClient } from "@/core/hooks/api-client";
import type { QueryLayoutProps } from "./types";

export default function QueryLayout<T>(props: QueryLayoutProps<T>) {
    const { data, isLoading, isError, error } = useApiClient<T>(
        props.queryClientOptions,
    );

    if (isLoading) {
        return <>...loading</>;
    }

    if (isError) {
        return <>{error?.message}</>;
    }

    if (data) {
        return <>{props.children(data)}</>;
    }
}
