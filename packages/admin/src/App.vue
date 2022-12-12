<script setup lang="ts">
import { ConfigProvider } from "ant-design-vue";
import { computed } from "vue";
import { useAppStore } from "./store";

const appStore = useAppStore();

const componentSize = computed(() => {
  return appStore.device === "mobile" ? "small" : "middle";
});
</script>

<template>
  <ConfigProvider :component-size="componentSize">
    <RouterView />
  </ConfigProvider>
</template>

<style>
html,
body,
#app {
  overflow: hidden;
}
</style>
