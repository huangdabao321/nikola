import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import pinia from "@/store";
import "nprogress/nprogress.css";
import "ant-design-vue/dist/antd.variable.less";
import "./permission.ts";
import "./style.less";

const app = createApp(App);
app.use(router);
app.use(pinia);
app.mount("#app");
