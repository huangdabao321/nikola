import { defineStore } from "pinia";
import { AppState } from "./types";
import defaultSettings from "@/config/settings.json";
import type { RouteRecordNormalized } from "vue-router";
import { loadDarkThemeCss } from "vite-plugin-theme/es/client";
import { getMenus } from "@/api/menu";

const useAppStore = defineStore("app", {
  state: (): AppState => ({ ...defaultSettings }),
  getters: {
    appCurrentSetting(state: AppState): AppState {
      return { ...state };
    },
    appDevice(state: AppState): string {
      return state.device;
    },
    appAsyncMenus(state: AppState): RouteRecordNormalized[] {
      return state.serverMenu as unknown as RouteRecordNormalized[];
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
      this.serverMenu = [];
    },
    async fetchServerMenuConfig() {
      // let notifyInstance: NotifycationReturn | null = null;
      try {
        const { data } = await getMenus();
      } catch (error) {}
    },
  },
});

export default useAppStore;
