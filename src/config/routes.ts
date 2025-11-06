import { Detail } from "@features/Detail";
import { Index } from "@features/Index";
import { Root } from "@features/Root";
import type { RouterConfig } from "@type/core/routeConfig";

export const routes: RouterConfig = {
  rootRoute: {
    component: Root,
  },
  routes: [
    {
      path: "/",
      component: Index,
    },
    {
      path: "/$id",
      loader: async ({ params }) => {
        return { id: params.id };
      },
      component: Detail,
    },
  ],
};
