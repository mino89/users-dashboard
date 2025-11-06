import QueryLayout from "@/components/layout/QueryLayout/QueryLayout";
import Filters from "@/components/shared/Filters/Filters";
import type { UsersList } from "@/types/user";
import { FILTERS_CONFIG } from "./config";

import { useFiltersResults } from "@/core/hooks/filters";

export function Index() {
    const { setFilters, filterdData } = useFiltersResults<UsersList["users"]>();

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
                    filterdData(data.users).map((user) => (
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
