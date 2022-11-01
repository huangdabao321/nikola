import { defineConfig } from "vite";
import { resolve } from "path";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import vue from "@vitejs/plugin-vue";
import { viteMockServe } from "vite-plugin-mock";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [
      vue(),
      Components({
        resolvers: [AntDesignVueResolver()],
      }),
      viteMockServe({
        mockPath: "mock",
        localEnabled: command === "serve",
        supportTs: false,
        logger: true
      }),
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },
  };
});
