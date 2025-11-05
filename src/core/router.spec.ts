import { expect, test } from "vitest";
import { composeChildRoutes, initializeRouter } from "@/core/router";
import { Router, createRootRoute } from "@tanstack/react-router";
import type { RouterConfig } from "./types/config";

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
