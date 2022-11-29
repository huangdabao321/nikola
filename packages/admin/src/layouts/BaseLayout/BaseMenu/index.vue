<template>
  <Menu :active-key="'1'">
    <MenuItem title="系统设置" key="1">系统设置</MenuItem>
  </Menu>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { Menu } from "ant-design-vue";
import { getMenus } from "@/api/menu";

export default defineComponent({
  name: "BaseMenu",
  components: { Menu, MenuItem: Menu.Item },
  setup() {
    onMounted(() => {
      // getMenus()
      //   .then((res) => {
      //     console.log(res);
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
    });
  },
});
</script>
