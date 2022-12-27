<template>
  <div class="tabs-bar-container" :style="wrapStyle">
    <div class="tab-bar-box">
      <div class="tab-bar-scroll">
        <div class="tags-wrap">
          <tag-item
            v-for="(tag, index) in tagList"
            :key="tag.fullPath"
            :index="index"
            :item-data="tag"
          ></tag-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TagItem from "./TagItem.vue";
import { useAppStore, useTabBar } from "@/store";
import { storeToRefs } from "pinia";
import { computed, onUnmounted } from "vue";
import { removeRouteListener, listenerRouteChange } from "@/utils/routeChange";

const appStore = useAppStore();
const tabStore = useTabBar();

const { theme } = storeToRefs(appStore);
const { tagList } = storeToRefs(tabStore);

const wrapStyle = computed(() => {
  return theme.value === "light"
    ? { background: "white" }
    : { background: "#1f1f1f" };
});

listenerRouteChange((route) => {
  if (!tagList.value.some((tag) => tag.fullPath === route.fullPath)) {
    tabStore.updateTabList(route);
  }
}, true);

onUnmounted(() => {
  removeRouteListener();
});
</script>

<style lang="less" scoped>
.tabs-bar-container {
  position: relative;
  background-color: var(--color-bg-2);
  .tab-bar-box {
    display: flex;
    padding: 0 0 0 20px;
    background-color: var(--color-bg-2);
    border-bottom: 1px solid var(--color-border);
    .tab-bar-scroll {
      height: 32px;
      flex: 1;
      overflow: hidden;
      .tags-wrap {
        padding: 4px 0;
        height: 48px;
        white-space: nowrap;
        overflow-x: auto;
        :deep(.ant-tag) {
          display: inline-flex;
          align-items: center;
          margin-right: 6px;
          cursor: pointer;
          &:first-child {
            .ant-tag-close-btn {
              display: none;
            }
          }
        }
      }
    }
  }
}
</style>
