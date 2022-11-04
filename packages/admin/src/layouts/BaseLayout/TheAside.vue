<template>
  <a-layout-sider
    breakpoint="lg"
    collapsedWidth="0"
    :collapsed="collapsed"
    @breakpoint="onBreakpoint"
    :style="{
      overflow: 'auto',
      height: '100vh',
    }"
    :trigger="null"
  >
    <div class="logo">
      <img src="@/assets/logo.png" alt="logo" />
    </div>
    <a-menu theme="dark" mode="inline" @click="onMenu">
      <template v-for="item in menuStore.sideMenus">
        <template v-if="!item.children">
          <a-menu-item :key="item.path">
            <!-- <user-outlined></user-outlined> -->
            <span class="nav-text">{{ item.meta.title }}</span>
          </a-menu-item>
        </template>
        <template v-else>
          <sub-menu :menu-info="item" :key="item.path"></sub-menu>
        </template>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script setup>
import { useRouter } from "vue-router";
import { UserOutlined } from "@ant-design/icons-vue";
import { useMenuStore } from "@/stores/menu";
import SubMenu from "./SubMenu.vue";
import { isUrl } from "@nikola/utils";

const props = defineProps({
  collapsed: {
    type: Boolean,
    default: false,
  },
});

const menuStore = useMenuStore();

const emit = defineEmits(["triggerCollapsed"]);
const onBreakpoint = (val) => {
  emit("triggerCollapsed", val);
};

const router = useRouter();
const onMenu = ({ key }) => {
  if (isUrl(key)) {
    window.location.href = key
  } else {
    router.push(key);
  }
};
</script>

<style lang="less" scoped>
.logo {
  margin: 16px;
  text-align: center;
  img {
    width: 100px;
  }
}
</style>
