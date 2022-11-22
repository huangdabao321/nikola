import router from "./router";
import NProgress from "nprogress";

NProgress.config({
  showSpinner: true,
});

router.beforeEach((from, to, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});
