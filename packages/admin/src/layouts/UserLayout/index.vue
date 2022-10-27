<template>
  <a-row>
    <a-col :sm="0" :md="8"></a-col>
    <a-col :sm="24" :md="8">
      <router-view></router-view>
    </a-col>
    <a-col :sm="0" :md="8"></a-col>
  </a-row>
</template>

<script setup>
import { device } from '@nikola/utils';
console.log('-->', device())
</script>

<style lang="scss" scoped>

</style>