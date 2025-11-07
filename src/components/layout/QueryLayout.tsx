import { useApiClient } from "@hooks/useApiClient";
import type { QueryClientProps } from "@type/core/queryClient";
import Error from "../ui/Error";
import Loading from "@components/ui/Loading";
type QueryLayoutProps<T> = {
    queryClientOptions: QueryClientProps;
    children: (data: T) => React.ReactNode;
};

export default function QueryLayout<T>(props: QueryLayoutProps<T>) {
    const { data, isLoading, isError, error } = useApiClient<T>(
        props.queryClientOptions,
    );

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <Error message={error?.message || "An error occurred."} />;
    }

    if (data) {
        return <>{props.children(data)}</>;
    }
}
