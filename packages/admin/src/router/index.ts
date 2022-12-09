import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
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
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
