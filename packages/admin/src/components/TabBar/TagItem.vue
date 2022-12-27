<template>
  <a-dropdown trigger="contextmenu">
    <Tag
      :color="color"
      :closable="index !== 0"
      @close="handleClose(itemData, index)"
      @click="handleClick(itemData)"
    >
      {{ itemData.title }}
    </Tag>
    <template #overlay>
      <a-menu @click="handleMenuClick">
        <a-menu-item :disabled="disableReload" key="reload"
          >重新加载</a-menu-item
        >
        <a-menu-item :disabled="disableCurrent" key="current"
          >关闭当前</a-menu-item
        >
        <a-menu-item :disabled="disableLeft" key="left">关闭左侧</a-menu-item>
        <a-menu-item :disabled="disableRight" key="right">关闭右侧</a-menu-item>
        <a-menu-item key="other">关闭其他</a-menu-item>
        <a-menu-item key="all">关闭全部</a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { Tag } from "ant-design-vue";
import type { MenuProps } from "ant-design-vue";
import { computed, toRefs, PropType } from "vue";
import { useTabBar } from "@/store";
import { TagProps } from "@/store/modules/tab-bar/types";
import { DEFAULT_ROUTE_NAME } from "@/router/constants";

const props = defineProps({
  itemData: {
    type: Object as PropType<TagProps>,
    default() {
      return [];
    },
  },
  index: {
    type: Number,
    default: 0,
  },
});

const { itemData, index } = toRefs(props);
const route = useRoute();
const router = useRouter();
const tabBarStore = useTabBar();

const color = computed(() => {
  return itemData.value.fullPath === route.fullPath ? "blue" : "default";
});
// 禁止刷新
const disableReload = computed(() => {
  return itemData.value.fullPath !== route.fullPath;
});
// 禁止关闭当前
const disableCurrent = computed(() => {
  return index.value === 0;
});
// 禁止关闭左侧
const disableLeft = computed(() => {
  return [0, 1].includes(index.value);
});
// 禁止关闭右侧
const disableRight = computed(() => {
  return index.value === tabBarStore.getCacheList.length - 1;
});
// 禁止关闭其他 todo
const disableOther = computed(() => {
  return false;
});
// 禁止关闭全部 todo
const disableAll = computed(() => {
  return false;
});

const handleClose = (item: TagProps, index: number) => {
  tabBarStore.deleteTag(index, item);
  if (itemData.value.fullPath === route.path) {
    const last = tabBarStore.getTabList[index - 1];
    router.push({ ...last });
  }
};

const handleClick = (item: TagProps) => {
  router.push({ ...item });
};

const findCurrentRouteIndex = () => {
  return tabBarStore.getTabList.findIndex(
    (el) => el.fullPath === route.fullPath
  );
};

// 菜单点击
const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
  const copyTagList = [...tabBarStore.getTabList];
  if (key === "current") {
    handleClose(itemData.value, index.value);
  } else if (key === "left") {
    const currentIdx = findCurrentRouteIndex();
    copyTagList.splice(1, index.value - 1);
    tabBarStore.freshTabList(copyTagList);
    if (currentIdx < index.value) {
      router.push({ name: itemData.value.name });
    }
  } else if (key === "right") {
    const currentIdx = findCurrentRouteIndex();
    copyTagList.splice(1, index.value + 1);
    tabBarStore.freshTabList(copyTagList);
    if (currentIdx > index.value) {
      router.push({ name: itemData.value.name });
    }
  } else if (key === "other") {
    const filterList = copyTagList.filter((el, idx) => {
      return idx === 0 || idx === index.value;
    });
    tabBarStore.freshTabList(filterList);
    router.push({ name: itemData.value.name });
  } else if (key === "all") {
    tabBarStore.restTabList();
    router.push({ name: DEFAULT_ROUTE_NAME });
  } else if (key === "reload") {
    tabBarStore.deleteCache(itemData.value);
    router.replace({ name: itemData.value.name });
  }
};
</script>

<style scoped>
.link-activated {
  color: var(--link-color);
}
</style>
