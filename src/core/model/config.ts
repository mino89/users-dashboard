import type {
  AnyRoute,
  RootRouteOptions,
  RouteOptions,
} from "@tanstack/react-router";

export type RouteConfig = Partial<RouteOptions<AnyRoute>> & {
  path: string;
};

export type RouterConfig = {
  rootRoute: RootRouteOptions;
  routes: RouteConfig[];
};
