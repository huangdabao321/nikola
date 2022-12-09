<script setup lang="ts">
import { Image, LayoutSider } from "ant-design-vue";
import BaseMenu from "@/layouts/BaseLayout/BaseMenu/index.tsx";
import { collapsedKey } from "@/layouts/BaseLayout/keys";
import { inject } from "vue";
import type { Ref } from "vue";
import logo from "@/assets/logo.png";

const collapsed = inject<Ref<boolean>>(collapsedKey);
</script>

<template>
  <LayoutSider class="sider-menu" :collapsed="collapsed">
    <div class="logo">
      <img :src="logo" />
    </div>
    <BaseMenu />
  </LayoutSider>
</template>

<style lang="less" scoped>
.sider-menu {
  height: 100vh;
  overflow: hidden;
  .logo {
    padding: 10px 20px;
    img {
      width: 100%;
    }
  }
}
</style>
