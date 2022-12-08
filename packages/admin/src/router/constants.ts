import type { RouteRecordRaw } from "vue-router";

export const WHITE_LIST = ["notFound", "login"];

export const NOT_FOUND = "notFound";

export const NOT_FOUND_ROUTE: RouteRecordRaw = {
  name: "notFound",
  path: "/:pathMatch(.*)*",
  component: () => import("@/views/errors/_404.vue"),
};

export const DEFAULT_ROUTE_NAME = "welcome";

export const DEFAULT_ROUTE = {
  title: "工作区",
  name: DEFAULT_ROUTE_NAME,
  fullPath: "/welcome",
};
