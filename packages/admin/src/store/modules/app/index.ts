import { defineStore } from "pinia";
import { AppState } from "./types";
import defaultSettings from "@/config/settings.json";
import type { RouteRecordRaw } from "vue-router";
import { loadDarkThemeCss } from "vite-plugin-theme/es/client";

const useAppStore = defineStore("app", {
  state: (): AppState => ({ ...defaultSettings }),
  getters: {
    appCurrentSetting(state: AppState): AppState {
      return { ...state };
    },
    appDevice(state: AppState): string {
      return state.device;
    },
    appMenus(state: AppState): RouteRecordRaw[] {
      return state.menus as unknown as RouteRecordRaw[];
    },
  },
  actions: {
    updateSettings(partial: Partial<AppState>) {
      // @ts-ignore-next-line
      this.$patch(partial);
    },
    async toggleTheme(dark: boolean) {
      if (dark) {
        this.theme = "dark";
        document.documentElement.setAttribute("data-theme", "dark");
        await loadDarkThemeCss();
      } else {
        this.theme = "light";
        document.documentElement.setAttribute("data-theme", "light");
      }
    },
    toggleDevice(device: string) {
      this.device = device;
    },
    clearServerMenu() {
      this.menus = [];
    },
    setMenus(menus: RouteRecordRaw[]) {
      // let notifyInstance: NotifycationReturn | null = null;
      this.menus = menus;
    },
  },
});

export default useAppStore;
