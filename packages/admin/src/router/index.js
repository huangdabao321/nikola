import { createRouter, createWebHistory } from "vue-router";
import { generateMenus } from "./_utils";

const notFound = {
  path: "/:pathMatch(.*)*",
  name: "NotFound",
  component: () => import("@/views/errors/404.vue"),
};

const routes = [
  {
    path: "/user",
    component: () => import("@/layouts/UserLayout/index.vue"),
    children: [
      {
        name: "login",
        path: "login",
        component: () => import("@/views/users/login.vue"),
        meta: {
          title: "登陆页",
        },
      },
      {
        path: "resetpwd",
        component: () => import("@/views/users/resetpwd.vue"),
      },
    ],
  },
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

export { generateMenus, notFound };
