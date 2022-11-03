<template>
  <a-sub-menu>
    <template #title>{{ menuInfo.meta.title }}</template>
    <template v-for="item in menuInfo.children" :key="item.path">
      <template v-if="!item.children">
        <a-menu-item :key="`${menuInfo.path}${item.path}`">
          {{ item.meta.title }}
        </a-menu-item>
      </template>
      <template v-else>
        <sub-menu :menu-info="item.children"></sub-menu>
      </template>
    </template>
  </a-sub-menu>
</template>

<script setup>
import { defineComponent } from 'vue';
defineComponent({
  name: 'SubMenu'
})
const props = defineProps({
  menuInfo: {
    type: Object,
    default: () => {}
  }
})

</script>

<style lang="less" scoped>

</style>