import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    name: "index",
    path: "/",
    component: () => import("@/views/index/welcome.vue"),
  },
  {
    name: "user",
    path: "/user",
    component: () => import("@/layouts/UserLayout/index.vue"),
    children: [
      {
        name: "login",
        path: "login",
        component: () => import("@/views/user/Login.vue"),
      },
    ],
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
