<script setup lang="ts">
import { Layout } from "ant-design-vue";
import TheHeader from "./TheHeader.vue";
import SideMenu from "./SideMenu.vue";
import TheContent from "./TheContent.vue";
import useResponsive from "@/hooks/responsive";

useResponsive(true);
</script>

<template>
  <Layout>
    <SideMenu />
    <Layout>
      <TheHeader />
      <TheContent />
    </Layout>
  </Layout>
</template>
