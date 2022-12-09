<script setup lang="ts">
import { Layout } from "ant-design-vue";
import TheHeader from "./TheHeader.vue";
import SideMenu from "./SideMenu.vue";
import TheContent from "./TheContent.vue";
import { provide, ref } from "vue";
import { collapsedKey } from "@/layouts/BaseLayout/keys";

const collapsed = ref<boolean>(false);
provide(collapsedKey, collapsed);
</script>

<template>
  <Layout>
    <SideMenu></SideMenu>
    <Layout>
      <TheHeader></TheHeader>
      <TheContent>
        <RouterView />
      </TheContent>
    </Layout>
  </Layout>
</template>
