import nProgress from "nprogress";
import router, { generateMenus } from "@/router";
import { store, setDocumentTitle } from "@nikola/utils";
import { useUserStore } from "@/stores/user";
import { message } from "ant-design-vue";

const loginName = "login";
const whiteList = [];

router.beforeEach((to, from, next) => {
  nProgress.start();
  to.meta &&
    to.meta.title &&
    setDocumentTitle(`${import.meta.env.VITE_APP_TITLE}-${to.meta.title}`);
  const token = store.get("accessToken");
  const userStore = useUserStore();

  if (token) {
    if (to.name === loginName) {
      next("/");
    }
    if (!userStore.id) {
      userStore
        .getUserInfo()
        .then(generateMenus)
        .then((routes) => {
          console.log("xxxxxxxxx", routes);
          routes.forEach((item) => {
            router.addRoute(item);
          });
          next({...to, replace: true});
        })
        .catch((error) => {
          console.log(error);
          // 获取用户信息失败 直接登出
          userStore.logout();
          message.error(error.msg);
        });
    }
    next();
  } else {
    if (to.name === loginName) {
      next();
    }
    next({ name: loginName });
  }
});

router.afterEach(() => {
  nProgress.done();
});
