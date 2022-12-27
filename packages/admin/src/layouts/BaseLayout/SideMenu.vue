<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import { LayoutSider, Drawer } from "ant-design-vue";
import BaseMenu from "@/layouts/BaseLayout/BaseMenu/index.tsx";
import { useAppStore } from "@/store";
import logo from "@/assets/vue.svg";
import { storeToRefs } from "pinia";
const appStore = useAppStore();
const { menuCollapse, device, theme } = storeToRefs(appStore);

const isMobile = computed(() => {
  return device.value === "mobile";
});

const visible = ref(false);

const close = () => {
  visible.value = false;
  appStore.updateSettings({ menuCollapse: true });
};

watchEffect(() => {
  if (appStore.device === "mobile") {
    visible.value = !menuCollapse.value;
  }
});

const sideBg = computed(() => {
  return theme.value === "light" ? "#001529" : "#1f1f1f";
});
</script>

<template>
  <LayoutSider class="sider-menu" :collapsed="menuCollapse" v-if="!isMobile">
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
      background: sideBg,
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
