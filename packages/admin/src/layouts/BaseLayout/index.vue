<template>
  <the-header></the-header>
  <a-row>
    <a-col>
      <the-aside></the-aside>
    </a-col>
    <the-main>
      <router-view></router-view>
    </the-main>
  </a-row>
</template>

<script setup>
import TheHeader from "./TheHeader.vue";
import TheAside from "./TheAside.vue";
import TheMain from "./TheMain.vue";
</script>

<style lang="scss" scoped></style>
