import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: 'index',
    component: () => import("@/layouts/BaseLayout/index.vue"),
    redirect: '/welcome',
    children: [
      {
        name: 'welcome',
        path: "welcome",
        component: () => import("@/views/welcome.vue"),
        meta: {
          title: '欢迎页'
        }
      },
    ],
  },
  {
    path: "/user",
    component: () => import("@/layouts/UserLayout/index.vue"),
    children: [
      {
        name: 'login',
        path: "login",
        component: () => import("@/views/users/login.vue"),
        meta: {
          title: '登陆页'
        }
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
