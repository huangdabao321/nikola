<script lang="ts">
import { useAppStore } from "@/store";
import { LayoutContent, Spin } from "ant-design-vue";
import { storeToRefs } from "pinia";
import TabBar from "@/components/TabBar/index.vue";
import { useTabBar } from "@/store";
import { computed } from "vue";

export default {
  components: { LayoutContent, Spin },
  setup() {
    const appStore = useAppStore();
    const { navbar } = storeToRefs(appStore);
    const tabBarStore = useTabBar();
    const cacheList = computed(() => tabBarStore.getCacheList);
    return {
      navbar,
      cacheList,
    };
  },
};
</script>

<template>
  <LayoutContent class="content-wrap">
    <TabBar v-if="navbar" />
    <div class="wrap">
      <router-view v-slot="{ Component, route }">
        <Transition name="fade-slide" mode="out-in" appear>
          <component
            :is="Component"
            :key="route.fullPath"
            v-if="route.meta.ignoreCache"
          />
          <keep-alive v-else :include="cacheList">
            <Suspense>
              <template #default>
                <component :is="Component" :key="route.fullPath" />
              </template>
              <template #fallback>
                <Spin />
              </template>
            </Suspense>
          </keep-alive>
        </Transition>
      </router-view>
    </div>
  </LayoutContent>
</template>

<style lang="less">
.content-wrap {
  height: calc(100vh - 64px);
  overflow-y: auto;
  .wrap {
    padding: 20px;
  }
}
</style>
