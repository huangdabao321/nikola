import nProgress from "nprogress";
import router from "@/router";
import { store, setDocumentTitle } from "@nikola/utils";

const loginName = "login";
const whiteList = [];

router.beforeEach((to, from, next) => {
  nProgress.start();
  to.meta && to.meta.title && setDocumentTitle(`${import.meta.env.VITE_APP_TITLE}-${to.meta.title}`)
  const token = store.get("accessToken");
  console.log(token);
  if (token) {
    if (to.name === loginName) {
      next("/");
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
