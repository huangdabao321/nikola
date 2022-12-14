import { Permission } from "../../src/store/modules/user/types";

const adminMenu: Permission[] = [
  {
    id: 1,
    pid: 0,
    name: "index",
    title: "首页",
    path: "/",
    redirect: "/welcome",
    component: "BaseLayout",
    icon: "",
    hideInMenu: true,
    hideChildren: false,
    ignoreCache: false,
  },
  {
    id: 2,
    pid: 1,
    name: "welcome",
    title: "欢迎页",
    path: "/welcome",
    redirect: "",
    target: "",
    component: "welcome",
    icon: "ant-design:chrome-outlined",
    hideInMenu: false,
    hideChildren: false,
  },
  {
    id: 3,
    pid: 1,
    name: "system",
    title: "系统设置",
    path: "/system",
    redirect: "",
    component: "RouterView",
    icon: "ant-design:setting-outlined",
    hideInMenu: false,
    hideChildren: false,
  },
  {
    id: 4,
    pid: 3,
    name: "user",
    title: "人员管理",
    path: "user",
    redirect: "",
    component: "user",
    icon: "",
    hideInMenu: false,
    hideChildren: false,
  },
];

const teacherMenu: Permission[] = [
  {
    id: 1,
    pid: 0,
    name: "index",
    title: "首页",
    path: "/",
    redirect: "/welcome",
    component: "BaseLayout",
    icon: "",
    hideInMenu: true,
    hideChildren: false,
  },
  {
    id: 2,
    pid: 1,
    name: "welcome",
    title: "欢迎页",
    path: "/welcome",
    redirect: "",
    component: "welcome",
    icon: "",
    hideInMenu: false,
    hideChildren: false,
  },
];

export { adminMenu, teacherMenu };
