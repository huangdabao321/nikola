<script setup lang="ts">
import { ConfigProvider } from "ant-design-vue";
</script>

<template>
  <ConfigProvider>
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
