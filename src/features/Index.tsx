import QueryLayout from "@components/layout/QueryLayout";
import Filters from "@components/ui/Filters";
import List from "@components/ui/List";
import ListItem from "@components/ui/ListItem";
import { FILTERS_CONFIG } from "@config/filters";
import { useFiltersResults } from "@hooks/useFilters";
import { Link } from "@tanstack/react-router";
import type { User, UsersList } from "@type/data/user";
import { Tag, UserCircle } from "lucide-react";

export function Index() {
    const { setFilters, filteredData } = useFiltersResults<User[]>();
    const handlePageParamUpdate = (lastPage: UsersList, allPages: any[]) => {
        const totalLoaded = allPages.length * 10;

        if (totalLoaded < lastPage.total) {
            return totalLoaded;
        }

        return undefined;
    };
    return (
        <>
            <h1>Users List</h1>
            <h2>Manage and view all users</h2>
            <Filters
                filters={FILTERS_CONFIG}
                onFiltersChange={(values) => setFilters(values)}
            />
            <QueryLayout<UsersList, User>
                infinite
                extractData={(response) => response.users}
                queryClientOptions={{
                    queryKeys: ["users", "infinite"],
                    queryParams: {
                        limit: 10,
                    },
                    infinite: true,
                    initialPageParam: 0,
                    pageParamKey: "skip",
                    getNextPageParam: (lastPage: UsersList, allPages) =>
                        handlePageParamUpdate(lastPage, allPages),
                }}
            >
                {(allUsers, loadMoreButton) => (
                    <>
                        <List<User> items={filteredData(allUsers)}>
                            {(user) => (
                                <ListItem
                                    key={user.id}
                                    title={`${user.firstName} ${user.lastName}`}
                                    subtitle={
                                        <>
                                            <Tag size={16} />
                                            &nbsp;
                                            {user.role}
                                        </>
                                    }
                                    link={`/${user.id}`}
                                    icon={<UserCircle />}
                                >
                                    <Link
                                        className="ellipsis"
                                        title={user.email}
                                        to={`mailto:${user.email}`}
                                    >
                                        {user.email}
                                    </Link>
                                </ListItem>
                            )}
                        </List>
                        {loadMoreButton}
                    </>
                )}
            </QueryLayout>
        </>
    );
}
