import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    name: "index",
    path: "/",
    redirect: "/welcome",
    component: () => import("@/layouts/BaseLayout/index.vue"),
    children: [
      {
        name: "welcome",
        path: "/welcome",
        component: () => import("@/views/welcome.vue"),
      },
    ],
  },
  {
    name: "user",
    path: "/user",
    component: () => import("@/layouts/UserLayout/index.vue"),
    children: [
      {
        name: "login",
        path: "login",
        component: () => import("@/views/login/index.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/errors/index.vue"),
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
