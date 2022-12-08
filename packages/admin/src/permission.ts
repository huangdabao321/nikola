import { message } from "ant-design-vue";
import router from "@/router";
import NProgress from "nprogress";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useAppStore, useUserStore } from "@/store";
import generateRoutes from "@/router/generateRoutes";
import { storeToRefs } from "pinia";
import { unref } from "vue";

NProgress.configure({
  showSpinner: false,
});

const { getItem } = useLocalStorage();
const ACCESS_TOKEN = "accessToken";

const whiteList: string[] = ["login"];
const loginPath = "/user/login";
const homePath = "/welcome";

router.beforeEach(async (to) => {
  const token = getItem(ACCESS_TOKEN);
  if (token) {
    if (to.path === loginPath) {
      return homePath;
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
          return true;
        } catch (error: any) {
          message.error(
            error?.response?.data?.message || error?.message || "错误,稍后再试"
          );
          return loginPath;
        }
      } else {
        return true;
      }
    }
  } else {
    if (whiteList.includes(to.name as string)) {
      return true;
    } else {
      return loginPath;
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
