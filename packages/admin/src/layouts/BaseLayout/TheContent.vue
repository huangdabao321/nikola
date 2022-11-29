<script lang="ts">
import { LayoutContent } from "ant-design-vue";
export default {
  components: { LayoutContent },
  setup() {},
};
</script>

<template>
  <LayoutContent class="content-wrap">
    content
    <slot name="default"></slot>
  </LayoutContent>
</template>

<style lang="less" scoped>
.content-wrap {
  height: calc(100vh - 64px);
}
</style>
