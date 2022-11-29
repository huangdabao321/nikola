<template>
  <footer>
    <a href="//beian.miit.gov.cn/">{{ copy }}</a>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getTitle } from "@/utils/util";

export default defineComponent({
  name: "GlobalFooter",
  setup() {
    const title = getTitle();
    const copy = import.meta.env.VITE_APP_COPY;
    return {
      title,
      copy,
    };
  },
});
</script>

<style lang="less" scoped>
footer {
  position: sticky;
  bottom: 0;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
