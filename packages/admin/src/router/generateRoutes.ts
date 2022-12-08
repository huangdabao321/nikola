import { Permission, Role } from "@/store/modules/user/types";
import { unref } from "vue";
import type { RouteRecordRaw } from "vue-router";
import { NOT_FOUND_ROUTE } from "./constants";
import BaseLayout from "@/layouts/BaseLayout/index.vue";
import RouterView from "@/layouts/RouterView/index.vue";

const componentMap = {
  BaseLayout,
  RouterView,
};

const modules = import.meta.glob("../views/**/*.vue");

const asyncComponent = [];
for (const key in modules) {
  const component = modules[key];
  const pathArr = key.split("/");
  let compName = pathArr[pathArr.length - 1].replace(".vue", "");
  if (compName === "index") {
    compName = pathArr[pathArr.length - 2];
  }
  asyncComponent[compName] = component;
}

export default function generateRoutes(
  roles: Role[]
): Promise<[RouteRecordRaw[], RouteRecordRaw[]]> {
  const permissions: Permission[] = [];

  if (unref(roles).length) {
    unref(roles).forEach((role) => {
      if (role.permissions && role.permissions.length) {
        role.permissions.forEach((permission) => {
          permissions.push(permission);
        });
      }
    });
  }
  const list: any = [];
  listToTree(permissions, list, 0);
  const routesData: RouteRecordRaw[] = transformData(list);
  const menusData = [...routesData];
  routesData.push(NOT_FOUND_ROUTE);
  return Promise.resolve([routesData, menusData]);
}

function transformData(list: Permission[]): RouteRecordRaw[] {
  return list.map((item) => {
    let menuRecordRaw: RouteRecordRaw = {
      path: item.path,
      redirect: item.redirect,
      name: item.name,
      meta: {
        hideInMenu: item.hideInMenu,
        hideChildren: item.hideChildren,
        ignoreCache: !!item.ignoreCache,
        title: item.title,
      },
      component: componentMap[item.component] || asyncComponent[item.component],
    };
    if (item.children) {
      menuRecordRaw.children = transformData(item.children);
    }
    return menuRecordRaw;
  });
}

function listToTree(list: Permission[], tree: any, pid: number = 0): void {
  list.forEach((item) => {
    if (item.pid === pid) {
      const child = {
        ...item,
        children: [],
      };
      listToTree(list, child.children, item.id);
      if (!child.children.length) {
        // @ts-ignore
        delete child.children;
      }
      tree.push(child);
    }
  });
}
