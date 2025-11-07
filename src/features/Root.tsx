import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export function Root() {
    return (
        <main className="container">
            <Outlet />
            <TanStackRouterDevtools />
        </main>
    );
}
