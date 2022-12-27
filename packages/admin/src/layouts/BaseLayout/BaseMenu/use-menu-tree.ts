import { useAppStore } from "@/store";
import { computed } from "vue";
import { cloneDeep } from "lodash";
import { RouteRecordRaw } from "vue-router";

export function useMenuTree() {
  const appStore = useAppStore();
  const appRoute = appStore.appMenus;

  const menuTree = computed(() => {
    const copyRouter = cloneDeep(appRoute);
    function travel(_routes: RouteRecordRaw[]) {
      const collector: any[] = _routes.map((route) => {
        const hideInMenu = route?.meta?.hideInMenu;
        const hideChildren = route?.meta?.hideChildren;
        const children = route.children;

        if (!hideInMenu && !children) {
          return route;
        }

        if (hideInMenu && !hideChildren && children) {
          return travel(children);
        }

        if (!hideInMenu && !hideChildren && children) {
          route.children = travel(children);
          return route;
        }
        return null;
      });
      return collector.filter(Boolean);
    }
    return travel(copyRouter).flat();
  });

  return { menuTree };
}
