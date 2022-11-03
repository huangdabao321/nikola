import nProgress from "nprogress";
import router, { generateMenus } from "@/router";
import { store, setDocumentTitle } from "@nikola/utils";
import { useUserStore } from "@/stores/user";
import { useMenuStore } from "@/stores/menu";
import { message } from "ant-design-vue";
import notFound from '@/router'

const loginName = "login";
const whiteList = [loginName];

router.beforeEach(async (to, from, next) => {
  nProgress.start();
  to.meta &&
    to.meta.title &&
    setDocumentTitle(`${import.meta.env.VITE_APP_TITLE}-${to.meta.title}`);
  const token = store.get("accessToken");
  const userStore = useUserStore();
  const menuStore = useMenuStore();
  if (token) {
    if (to.name === loginName) {
      next("/");
    } else {
      if (!userStore.user.id) {
        try {
          const roles = await userStore.getUserInfo();
          const routes = await generateMenus(roles);
          menuStore.setMenu(routes)
          routes.forEach((item) => {
            router.addRoute(item);
          });
          router.addRoute(notFound)
          next({ ...to, replace: true });
        } catch (error) {
          // 获取用户信息失败 直接登出
          userStore.logout();
          message.error(error.msg);
        }
      } else {
        next();
      }
    }
  } else {
    if (whiteList.includes(to.name)) {
      next();
    } else {
      next({ name: loginName, query: { redirect: to.fullPath } });
    }
  }
});

router.afterEach(() => {
  nProgress.done();
});
