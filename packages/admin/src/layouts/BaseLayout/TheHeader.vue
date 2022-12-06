<template>
  <LayoutHeader class="header">
    <div></div>
    <Space class="right">
      <Switch v-model:checked="checked" @change="handleChange(checked)">
        <template #checkedChildren>☀️</template>
        <template #unCheckedChildren>🌒</template>
      </Switch>
      <Dropdown trigger="click" placement="bottomLeft">
        <Avatar :src="avatar" />
        <template #overlay>
          <Menu>
            <MenuItem> 个人中心 </MenuItem>
            <MenuItem> 退出登陆 </MenuItem>
          </Menu>
        </template>
      </Dropdown>
    </Space>
  </LayoutHeader>
</template>

<script lang="ts">
import {
  LayoutHeader,
  Switch,
  Avatar,
  Dropdown,
  Space,
  Menu,
} from "ant-design-vue";
import { defineComponent, ref } from "vue";
import { useAppStore, useUserStore } from "@/store";

export default defineComponent({
  name: "TheHeader",
  components: {
    LayoutHeader,
    Switch,
    Avatar,
    Dropdown,
    Space,
    Menu,
    MenuItem: Menu.Item,
  },
  setup() {
    const checked = ref(true);
    const appStore = useAppStore();
    const userStore = useUserStore();
    const { avatar } = userStore.userInfo;
    const handleChange = async (checked: boolean) => {
      appStore.toggleTheme(!checked);
    };
    return {
      checked,
      handleChange,
      avatar,
    };
  },
});
</script>

<style lang="less">
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>
