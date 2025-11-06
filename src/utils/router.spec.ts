import { createRootRoute, Router } from "@tanstack/react-router";
import type { RouterConfig } from "@type/core/routeConfig";
import { test, expect } from "vitest";
import { composeChildRoutes, initializeRouter } from "./router";

const mockRouteConfig: RouterConfig = {
  rootRoute: {
    component: () => null,
  },
  routes: [
    {
      path: "test",
      component: () => null,
    },
  ],
};

test("must compose child routes", () => {
  const rootRoute = createRootRoute(mockRouteConfig.rootRoute);
  const childRoutes = composeChildRoutes(mockRouteConfig.routes, rootRoute);
  expect(Object.values(childRoutes[0].options)).includes("test");
});

test("must export router instance ", () => {
  const router = initializeRouter(mockRouteConfig);
  expect(router).toBeInstanceOf(Router);
});
