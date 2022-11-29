import type { RouteRecordRaw } from "vue-router";
import generateRoutes from "@/router/generateRoutes";
import { defineStore } from "pinia";
import { userLogin, getUserinfo } from "@/api/user";
import { Role, Permission } from "@/router/types";

const userStore = defineStore("userStore", {
  state: () => {
    return {
      name: "",
      nickname: "",
      openid: "",
      roles: [],
      persmissions: [],
      menus: [],
    };
  },
  actions: {
    login: function (params: any) {
      return new Promise((resolve, reject) => {
        userLogin(params)
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    async userInfo(): Promise<Role[]> {
      const info = await getUserinfo();
      const roles: Role[] = [];
      return roles;
    },
    setMenus(menus: []) {
      this.menus = menus;
    },
  },
  getters: {},
});

export default userStore;
