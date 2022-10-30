<template>
  <a-layout>
    <the-aside :collapsed="collapsed"></the-aside>
      <a-layout>
        <the-header
          @triggerCollapsed="handleTrigger"
          :collapsed="collapsed"
        ></the-header>
        <the-main>
          <router-view></router-view>
        </the-main>
      </a-layout>
  </a-layout>
</template>

<script setup>
import TheHeader from "./TheHeader.vue";
import TheAside from "./TheAside.vue";
import TheMain from "./TheMain.vue";
import { ref } from "vue";

let collapsed = ref(false);
console.log("------->", collapsed);

const handleTrigger = (val) => {
  collapsed.value = val;
  console.log("trigger:", val);
};
</script>

<style lang="less" scoped></style>
