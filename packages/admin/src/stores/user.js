import { defineStore } from "pinia";
import { reactive } from "vue";
import { login as userLogin } from "@/apis/login";
import { store } from "@nikola/utils";

export const useUserStore = defineStore("user", () => {
  let user = reactive({
    name: "",
    avatar: "",
  });
  function setUser(val) {
    user = { ...val };
  }
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
  return { user, setUser, login };
});
