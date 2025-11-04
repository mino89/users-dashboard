import QueryLayout from "@/components/layout/QueryLayout/QueryLayout";
import Json from "@/components/utils/Json/Json";
import type { UsersList } from "@/types/user";

export function Index() {
    return (
        <>
            <h1>Welcome Home!</h1>
            <QueryLayout<UsersList>
                queryClientOptions={{
                    queryKeys: ["user"],
                    queryParams: {
                        limit: 0,
                    },
                }}
            >
                {(data) => <Json obj={data.users} />}
            </QueryLayout>
        </>
    );
}
