<script setup lang="ts">
import { inject, computed, ref, watchEffect } from "vue";
import type { Ref } from "vue";
import { LayoutSider, Drawer } from "ant-design-vue";
import BaseMenu from "@/layouts/BaseLayout/BaseMenu/index.tsx";
import { collapsedKey } from "@/layouts/BaseLayout/keys";
import { useAppStore } from "@/store";
import logo from "@/assets/vue.svg";
const appStore = useAppStore();

const isMobile = computed(() => {
  return appStore.device === "mobile";
});

const collapsed = inject<Ref<boolean>>(collapsedKey, ref(false));

const visible = ref(false);

const close = () => {
  visible.value = false;
  collapsed.value = true;
};

watchEffect(() => {
  if (appStore.device === "mobile") {
    visible.value = !collapsed.value;
  }
});
</script>

<template>
  <LayoutSider class="sider-menu" :collapsed="collapsed" v-if="!isMobile">
    <div class="logo">
      <img :src="logo" />
    </div>
    <BaseMenu />
  </LayoutSider>
  <Drawer
    :mask-closable="true"
    placement="left"
    width="250px"
    :visible="visible"
    :closable="false"
    @close="close"
    :footer="null"
    :body-style="{
      padding: 0,
      background: '#001529',
    }"
    v-else
  >
    <BaseMenu />
  </Drawer>
</template>

<style lang="less" scoped>
.sider-menu {
  height: 100vh;
  overflow: hidden;
  .logo {
    padding: 10px 20px;
    img {
      height: 44px;
    }
  }
}
</style>
