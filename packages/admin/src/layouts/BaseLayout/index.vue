<script setup lang="ts">
import { Layout } from "ant-design-vue";
import TheHeader from "./TheHeader.vue";
import SideMenu from "./SideMenu.vue";
import TheContent from "./TheContent.vue";
</script>

<template>
  <Layout>
    <TheHeader></TheHeader>
    <Layout>
      <SideMenu></SideMenu>
      <TheContent>
        <RouterView />
      </TheContent>
    </Layout>
  </Layout>
</template>
