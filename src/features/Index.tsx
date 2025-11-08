import QueryLayout from "@components/layout/QueryLayout";
import Filters from "@components/ui/Filters";
import List from "@components/ui/List";
import ListItem from "@components/ui/ListItem";
import { FILTERS_CONFIG } from "@config/filters";
import { useFiltersResults } from "@hooks/useFilters";
import { Link } from "@tanstack/react-router";
import type { UsersList, User } from "@type/data/user";

export function Index() {
    const { setFilters, filteredData } =
        useFiltersResults<UsersList["users"]>();

    return (
        <>
            <h1>Users List</h1>
            <h2>Manage and view all users</h2>
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
                {(data) => (
                    <List<User> items={filteredData(data.users)}>
                        {(user) => (
                            <ListItem
                                key={user.id}
                                title={`${user.firstName} ${user.lastName}`}
                                subtitle={user.role}
                                link={`/${user.id}`}
                            >
                                <Link to={`mailto:${user.email}`}>
                                    {user.email}
                                </Link>
                            </ListItem>
                        )}
                    </List>
                )}
            </QueryLayout>
        </>
    );
}
