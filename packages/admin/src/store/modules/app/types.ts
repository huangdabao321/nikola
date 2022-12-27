import type { RouteRecordRaw } from "vue-router";

export interface AppState {
  theme: string;
  navbar: boolean;
  menu: boolean;
  menuCollapse: boolean;
  footer: boolean;
  themeColor: string;
  menuWidth: number;
  globalSettings: boolean;
  device: string;
  tabBar: boolean;
  menus: RouteRecordRaw[];
}
