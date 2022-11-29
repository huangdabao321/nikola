<script setup lang="ts">
import { LayoutSider } from "ant-design-vue";
import BaseMenu from "@/layouts/BaseLayout/BaseMenu/index.vue";
</script>

<template>
  <LayoutSider class="sider-menu">
    <BaseMenu />
  </LayoutSider>
</template>

<style lang="less" scoped>
.sider-menu {
  height: calc(100vh - 64px);
  overflow: hidden;
}
</style>
