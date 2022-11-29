import { message } from "ant-design-vue";
import router from "@/router";
import NProgress from "nprogress";
import useLocalStorage from "@/hooks/useLocalStorage";
import useUserStore from "@/store/user";
import generateRoutes from "@/router/generateRoutes";

NProgress.configure({
  showSpinner: false,
});

const { getItem } = useLocalStorage();
const ACCESS_TOKEN = "accessToken";

const whiteList: string[] = ["login"];
const loginPath = "/user/login";
const homePath = "/welcome";

// router.beforeEach(async (to, from) => {
//   const token = getItem(ACCESS_TOKEN);
//   if (token) {
//     if (to.path === loginPath) {
//       return homePath;
//     } else {
//       const userStore = useUserStore();
//       const userRoles = userStore.roles;
//       if (!userRoles.length) {
//         const roles = await userStore.userInfo();
//       } else {
//         return true;
//       }
//     }
//   } else {
//     if (whiteList.includes(to.name as string)) {
//       return true;
//     } else {
//       return loginPath;
//     }
//   }
// });

// router.afterEach(() => {
//   NProgress.done();
// });
