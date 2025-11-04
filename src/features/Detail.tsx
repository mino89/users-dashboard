import { getRouteApi } from "@tanstack/react-router";

const routeApi = getRouteApi("/$id");

export function Detail() {
    const id = routeApi.useParams().id;
    return (
        <div className="p-2">
            <h1>Detail Page {id}</h1>
        </div>
    );
}
