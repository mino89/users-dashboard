import { useApiClient } from "@hooks/useApiClient";
import type { QueryClientProps } from "@type/core/queryClient";
import Error from "../ui/Error";
type QueryLayoutProps<T> = {
    queryClientOptions: QueryClientProps;
    children: (data: T) => React.ReactNode;
};

export default function QueryLayout<T>(props: QueryLayoutProps<T>) {
    const { data, isLoading, isError, error } = useApiClient<T>(
        props.queryClientOptions,
    );

    if (isLoading) {
        return <>...loading</>;
    }

    if (isError) {
        return <Error message={error?.message || "An error occurred."} />;
    }

    if (data) {
        return <>{props.children(data)}</>;
    }
}
