import { BoldOutlinedIconType } from "@ant-design/icons-vue/lib/icons/BoldOutlined";
import type { RouteRecordNormalized } from "vue-router";

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
  serverMenu: RouteRecordNormalized[];
}
