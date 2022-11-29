<template>
  <LayoutHeader style="">
    <Switch v-model:checked="checked" @change="handleChange(checked)">
      <template #checkedChildren>☀️</template>
      <template #unCheckedChildren>🌒</template>
    </Switch>
  </LayoutHeader>
</template>

<script lang="ts">
import { LayoutHeader, Switch } from "ant-design-vue";
import { defineComponent, ref } from "vue";
import { loadDarkThemeCss } from "vite-plugin-theme/es/client";
export default defineComponent({
  name: "TheHeader",
  components: { LayoutHeader, Switch },
  setup() {
    const checked = ref(true);
    const handleChange = async (checked: boolean) => {
      const htmlRoot = document.body;
      // const htmlRoot = document.querySelector("#htmlRoot");
      if (!htmlRoot) {
        return;
      }
      // light 模式
      if (checked) {
        htmlRoot.setAttribute("data-theme", "light");
        // if (hasDarkClass) {
        //   htmlRoot.classList.remove("dark");
        // }
      } else {
        // 暗黑模式
        await loadDarkThemeCss();
        htmlRoot.setAttribute("data-theme", "dark");
      }
    };
    return {
      checked,
      handleChange,
    };
  },
});
</script>

<style lang="less"></style>
