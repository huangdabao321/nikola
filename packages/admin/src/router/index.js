import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/BaseLayout/index.vue"),
    redirect: '/welcome',
    children: [
      {
        path: "welcome",
        component: () => import("@/views/welcome.vue"),
      },
    ],
  },
  {
    path: "/user",
    component: () => import("@/layouts/UserLayout/index.vue"),
    children: [
      {
        path: "login",
        component: () => import("@/views/users/login.vue"),
      },
      {
        path: "resetpwd",
        component: () => import("@/views/users/resetpwd.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/errors/404.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
