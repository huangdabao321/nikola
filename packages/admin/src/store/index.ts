import { createPinia } from "pinia";
import useAppStore from "./modules/app";
import useUserStore from "./modules/user";
import useTabBar from "./modules/tab-bar";

const pinia = createPinia();

export default pinia;

export { useAppStore, useUserStore, useTabBar };
