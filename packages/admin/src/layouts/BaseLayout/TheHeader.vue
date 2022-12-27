<template>
  <LayoutHeader class="header" :style="headBg">
    <div class="collapsed-wrap" @click="handleCollapsed">
      <Transition name="fade" mode="out-in">
        <menu-unfold-outlined v-if="menuCollapse" />
        <menu-fold-outlined v-else />
      </Transition>
    </div>
    <Space class="right">
      <Switch v-model:checked="checked">
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
import { computed, defineComponent } from "vue";
import { useAppStore, useUserStore } from "@/store";
import { storeToRefs } from "pinia";

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
    const appStore = useAppStore();
    const userStore = useUserStore();
    const { avatar } = userStore.userInfo;
    const { menuCollapse, theme } = storeToRefs(appStore);

    const checked = computed({
      get() {
        return theme.value === "light";
      },
      set(newValue: boolean) {
        const theme = newValue ? "light" : "dark";
        appStore.toggleTheme(newValue);
        appStore.updateSettings({ theme });
      },
    });

    const headBg = computed(() => {
      return theme.value === "light"
        ? { backgroundColor: "white", color: "#001529" }
        : { backgroundColor: "rgba(144, 147, 153, 0.3)" };
    });

    const handleCollapsed = () => {
      // @ts-ignore
      appStore.updateSettings({ menuCollapse: !menuCollapse.value });
    };
    return {
      checked,
      avatar,
      menuCollapse,
      headBg,
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
  }
}
</style>
