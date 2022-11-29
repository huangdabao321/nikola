import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { viteMockServe } from "vite-plugin-mock";
import { createHtmlPlugin } from "vite-plugin-html";
import path from "path";
import {
  antdDarkThemePlugin,
  viteThemePlugin,
  mixLighten,
  mixDarken,
  tinycolor,
} from "vite-plugin-theme";
// 获取主题less变量
import { getThemeVariables } from "ant-design-vue/dist/theme";
import { getThemeColors, generateColors } from "./build/color.js";

const colors = generateColors({
  mixDarken,
  mixLighten,
  tinycolor,
});

export default defineConfig({
  define: {
    __COLOR_PLUGIN_OUTPUT_FILE_NAME__: undefined,
    __PROD__: true,
    __COLOR_PLUGIN_OPTIONS__: {},
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  plugins: [
    vue(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false,
        }),
      ],
    }),
    vueJsx(),
    viteMockServe({
      localEnabled: true,
    }),
    createHtmlPlugin({
      inject: {
        data: {
          title: "悦车网",
        },
      },
    }),
    viteThemePlugin({
      colorVariables: [...getThemeColors(), ...colors], // 需要给一个初始值才能正常使用功能
    }),
    antdDarkThemePlugin({
      darkModifyVars: {
        ...getThemeVariables({ dark: true }),
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
