import type { RouteRecordRaw } from "vue-router";

export const WHITE_LIST = [
  { name: "notFound", children: [] },
  { name: "login", children: [] },
];

export const NOT_FOUND = {
  name: "notFound",
};

export const NOT_FOUND_ROUTE: RouteRecordRaw = {
  name: "notFound",
  path: "/:pathMatch(.*)*",
  component: () => import("@/views/errors/index.vue"),
};

export const REDIRECT_ROUTE_NAME = "Redirect";

export const DEFAULT_ROUTE_NAME = "Workplace";

export const DEFAULT_ROUTE = {
  title: "工作区",
  name: DEFAULT_ROUTE_NAME,
  fullPath: "/dashboard/workplace",
};
