import { unref } from "vue";
import { storeToRefs } from "pinia";
import router from "@/router";
import { message } from "ant-design-vue";
import NProgress from "nprogress";
import { WHITE_LIST, DEFAULT_ROUTE_NAME, LOGIN_PATH } from "@/router/constants";
import { ACCESSTOKEN } from "@/store/modules/user/constants";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useAppStore, useUserStore } from "@/store";
import generateRoutes from "@/router/generateRoutes";
import { setRouteEmitter } from "./utils/routeChange";

NProgress.configure({
  showSpinner: false,
});

const { getItem } = useLocalStorage();

router.beforeEach(async (to) => {
  const token = getItem(ACCESSTOKEN);
  setRouteEmitter(to);
  if (token) {
    if (to.path === LOGIN_PATH) {
      return DEFAULT_ROUTE_NAME;
    } else {
      const userStore = useUserStore();
      let { roles } = storeToRefs(userStore);
      if (roles && !unref(roles).length) {
        try {
          await userStore.info();
          // @ts-ignore
          const [routes, menus] = await generateRoutes(roles);
          routes.forEach((route) => {
            router.addRoute(route);
          });
          const appStore = useAppStore();
          appStore.setMenus(menus);
          return to.path;
        } catch (error: any) {
          message.error(
            error?.response?.data?.message || error?.message || "错误,稍后再试"
          );
          return LOGIN_PATH;
        }
      } else {
        return true;
      }
    }
  } else {
    if (WHITE_LIST.includes(to.name as string)) {
      return true;
    } else {
      return LOGIN_PATH;
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
