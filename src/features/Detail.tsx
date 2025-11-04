import QueryLayout from "@/components/layout/QueryLayout/QueryLayout";
import Json from "@/components/utils/Json/Json";
import type { User } from "@/types/user";
import { getRouteApi } from "@tanstack/react-router";

const routeApi = getRouteApi("/$id");

export function Detail() {
    const id = routeApi.useParams().id;
    return (
        <div className="p-2">
            <h1>Detail Page {id}</h1>
            <QueryLayout<User>
                queryClientOptions={{
                    queryKeys: ["user"],
                    path: [id],
                }}
            >
                {(data) => <Json obj={data} />}
            </QueryLayout>
        </div>
    );
}
