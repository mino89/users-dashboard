import QueryLayout from "@components/layout/QueryLayout";
import Json from "@components/utils/Json";
import { getRouteApi } from "@tanstack/react-router";
import type { User } from "@type/data/user";

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
