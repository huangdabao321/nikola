<template>
  <a-layout-header class="header">
    <menu-unfold-outlined
      v-if="collapsed"
      class="trigger"
      @click="$emit('triggerCollapsed', false)"
    />
    <menu-fold-outlined
      v-else
      class="trigger"
      @click="$emit('triggerCollapsed', true)"
    />
  </a-layout-header>
</template>

<script setup>
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue";
import { ref } from "vue";

const props = defineProps({
  collapsed: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['triggerCollapsed'])

</script>

<style lang="less" scoped>
.header {
  background-color: #fff;
  padding: 0 20px;
  span{
    font-size: 30px;
    line-height: 64px;
  }
}
</style>
