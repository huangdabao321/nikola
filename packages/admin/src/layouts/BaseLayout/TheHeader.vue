<template>
  <LayoutHeader class="header">
    <div class="collapsed-wrap" @click="handleCollapsed">
      <menu-unfold-outlined v-if="collapsed" />
      <menu-fold-outlined v-else />
    </div>
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
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons-vue";
import { defineComponent, ref, watchEffect } from "vue";
import { useAppStore, useUserStore } from "@/store";
import { collapsedKey } from "@/layouts/BaseLayout/keys";
import { inject } from "vue";
import type { Ref } from "vue";

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
    MenuFoldOutlined,
    MenuUnfoldOutlined,
  },
  setup() {
    const checked = ref(true);
    const appStore = useAppStore();
    const userStore = useUserStore();
    const { avatar } = userStore.userInfo;
    const handleChange = async (checked: boolean) => {
      appStore.toggleTheme(!checked);
    };
    const collapsed = inject<Ref<boolean>>(collapsedKey, ref(false));

    watchEffect(() => {
      if (appStore.device === "mobile") {
        console.log("collapsed", collapsed);
      }
    });

    const handleCollapsed = () => {
      // @ts-ignore
      collapsed.value = !collapsed.value;
    };
    return {
      checked,
      avatar,
      collapsed,
      handleChange,
      handleCollapsed,
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
  padding-left: 10px;
  .collapsed-wrap {
    font-size: 30px;
    color: white;
  }
}
</style>
