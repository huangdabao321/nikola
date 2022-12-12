<script lang="ts">
import { LayoutContent } from "ant-design-vue";
export default {
  components: { LayoutContent },
  setup() {},
};
</script>

<template>
  <LayoutContent class="content-wrap">
    <slot name="default"></slot>
  </LayoutContent>
</template>

<style lang="less" scoped>
.content-wrap {
  padding: 20px;
  height: calc(100vh - 64px);
  overflow-y: auto;
}
</style>
