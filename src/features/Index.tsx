import QueryLayout from "@components/layout/QueryLayout";
import Filters from "@components/ui/Filters";
import { FILTERS_CONFIG } from "@config/filters";
import { useFiltersResults } from "@hooks/useFilters";
import type { UsersList, User } from "@type/data/user";

export function Index() {
    const { setFilters, filteredData } =
        useFiltersResults<UsersList["users"]>();

    return (
        <>
            <h1>Welcome Home!</h1>
            <Filters
                filters={FILTERS_CONFIG}
                onFiltersChange={(values) => setFilters(values)}
            />
            <QueryLayout<UsersList>
                queryClientOptions={{
                    queryKeys: ["user"],
                    queryParams: {
                        limit: 0,
                    },
                }}
            >
                {(data) =>
                    filteredData(data.users).map((user: User) => (
                        <div key={user.id}>
                            <p>
                                {user.firstName} {user.lastName} - {user.role}
                            </p>
                        </div>
                    ))
                }
            </QueryLayout>
        </>
    );
}
