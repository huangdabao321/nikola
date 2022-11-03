import { defineStore } from "pinia";
import { reactive } from "vue";
import { login as userLogin, getUserInfo as userInfo } from "@/apis/auth";
import { store } from "@nikola/utils";

export const useUserStore = defineStore("user", () => {
  let user = reactive({
    name: "",
    avatar: "",
    roles: [],
    permissions: []
  });

  // 登陆
  async function login(params) {
    try {
      const res = await userLogin(params);
      const { accessToken, expireIn } = res.data;
      store.set("accessToken", accessToken, expireIn);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }
  // 登出
  function logout() {
    store.set('accessToken', null, -1)
    window.location.href = '/user/login'
  }
  // 获取用户信息
  function getUserInfo() {
    return new Promise((resolve, reject) => {
      userInfo().then(res => {
        const { id, name, avatar, roles, permissions } = res.data
        user.id = id
        user.name = name
        user.avatar = avatar
        user.roles = roles
        user.permissions = permissions
        resolve(roles)
      }).catch(error => {
        reject(error)
      })
    })
  }
  return { user, login, logout, getUserInfo };
});
