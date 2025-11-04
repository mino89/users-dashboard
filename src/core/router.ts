import {
  createRootRoute,
  createRoute,
  createRouter,
  RootRoute,
} from "@tanstack/react-router";
import type { RouteConfig, RouterConfig } from "./model/config";
import { routes } from "@/routes";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export function initializeRouter(routesConfig: RouterConfig) {
  const { rootRoute, routes } = routesConfig;
  const genRootRoute = createRootRoute(rootRoute);
  const genRoutes = composeChildRoutes(routes, genRootRoute);
  const routeTree = genRootRoute.addChildren(genRoutes);
  return createRouter({ routeTree });
}

export function composeChildRoutes(
  routes: RouteConfig[],
  rootRoute: RootRoute,
) {
  return routes.map((route) => {
    const config = {
      getParentRoute: () => rootRoute,
      ...route,
    };
    return createRoute(config as Parameters<typeof createRoute>[0]);
  });
}

export const router = initializeRouter(routes);
