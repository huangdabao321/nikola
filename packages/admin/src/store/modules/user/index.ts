import { getUserinfo, userLogin, LoginData } from "@/api/user";
import { defineStore } from "pinia";
import { UserState, Role } from "./types";
import useLocalStorage from "@/hooks/useLocalStorage";
import { ACCESSTOKEN } from "./constants";
import { notification } from "ant-design-vue";

const { setItem } = useLocalStorage();

const useUserStore = defineStore("user", {
  state: (): UserState => ({
    id: 0,
    name: "",
    avatar: "",
    mobile: "",
    openid: "",
    roles: [] as Role[],
  }),
  getters: {
    userInfo(state: UserState): UserState {
      return { ...state };
    },
  },
  actions: {
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial);
    },
    resetInfo() {
      this.$reset();
    },
    async info() {
      try {
        const { data } = await getUserinfo();
        this.setInfo(data);
      } catch (error) {
        throw error;
      }
    },
    async login(loginForm: LoginData) {
      try {
        const { data } = await userLogin(loginForm);
        const { accessToken, expire } = data;
        setItem(ACCESSTOKEN, accessToken, expire);
      } catch (error) {
        throw error;
      }
    },
  },
});

export default useUserStore;
