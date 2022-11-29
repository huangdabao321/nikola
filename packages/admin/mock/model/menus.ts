export interface MenuType {
  id: number;
  pid: number;
  name: string;
  title: string;
  path: string;
  redirect: string;
  component: string;
  icon: string;
  hideInMenu: boolean;
  hideChildren: boolean;
}
const adminMenu: MenuType[] = [
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
  {
    id: 3,
    pid: 1,
    name: "system",
    title: "系统设置",
    path: "/system",
    redirect: "",
    component: "RouteView",
    icon: "",
    hideInMenu: false,
    hideChildren: false,
  },
  {
    id: 4,
    pid: 3,
    name: "user",
    title: "人员设置",
    path: "user",
    redirect: "",
    component: "user",
    icon: "",
    hideInMenu: false,
    hideChildren: false,
  },
];

const teacherMenu: MenuType[] = [
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
