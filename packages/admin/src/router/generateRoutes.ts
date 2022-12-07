import { Permission, Role } from "@/store/modules/user/types";
import { unref } from "vue";
import type { RouteRecordNormalized, RouteRecordRaw } from "vue-router";
import { NOT_FOUND_ROUTE } from "./constants";
import { AppRouteRecordRaw, Component } from "./types";
import BaseLayout from "@/layouts/BaseLayout/index.vue";
import RouterView from "@/layouts/BaseLayout/index.vue";

const componentMap = {
  BaseLayout,
  RouterView,
};
export default function generateRoutes(
  roles: Role[]
): Promise<RouteRecordRaw[]> {
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
  routesData.push(NOT_FOUND_ROUTE);
  return Promise.resolve(routesData);
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
      component:
        (componentMap[item.component] as Component) ||
        (() => import(`@/views/${item.component}`)),
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
