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
      <template v-for="item in menuData">
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
import { computed, isRef, onUpdated, toRaw } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { UserOutlined } from "@ant-design/icons-vue";
import { useMenuStore } from "@/stores/menu";
import SubMenu from "./SubMenu.vue";

const menuStore = useMenuStore();

const { menus } = storeToRefs(menuStore);


const menuData = computed(() => {
  let data = [];
  menus.value.forEach((item) => {
    if (item.name === "index") {
      data = data.concat(...item.children);
    } else {
      data.push(item);
    }
  });
  return data;
});


const props = defineProps({
  collapsed: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["triggerCollapsed"]);
const onBreakpoint = (val) => {
  emit("triggerCollapsed", val);
};

const router = useRouter();
const onMenu = ({ key }) => {
  router.push(key);
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
