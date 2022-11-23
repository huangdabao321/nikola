<template>
  <a-tabs
    hideAdd
    v-model:activeKey="state.activeKey"
    type="card"
    class="multi-tab"
  >
    <a-tab-pane v-for="page in state.pages" :key="page.fullPath">
      <template #tab>
        <a-dropdown :trigger="['contextmenu']">
          <template #overlay>
            <a-menu @click="({ key }) => closeMenuClick(page.fullPath, key)">
              <a-menu-item key="closeThat">关闭当前</a-menu-item>
              <a-menu-item key="closeRight">关闭右侧</a-menu-item>
              <a-menu-item key="closeLeft">关闭左侧</a-menu-item>
              <a-menu-item key="closeAll">关闭全部</a-menu-item>
            </a-menu>
          </template>
          {{ page.meta.title }}
        </a-dropdown>
      </template>
    </a-tab-pane>
  </a-tabs>
</template>

<script setup>
import { reactive, watchEffect, unref, toRaw } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const state = reactive({
  fullPathList: [],
  pages: [],
  activeKey: "",
});

// const onEdit = (targetKey) => {
//   remove(targetKey);
// };

const remove = (targetKey) => {
  if (state.fullPathList.length > 1) {
    let lastIndex = state.pages.findIndex(
      (page) => page.fullPath === targetKey,
    );
    state.fullPathList = toRaw(state.fullPathList).filter(
      (key) => key !== targetKey,
    );
    state.pages = toRaw(state.pages).filter(
      (page) => page.fullPath !== targetKey,
    );
    state.activeKey = state.pages[lastIndex - 1].fullPath;
    router.push(state.activeKey);
  }
};

const closeMenuClick = (path, key) => {
  console.log(path, key);
};

watchEffect(() => {
  const route = unref(router.currentRoute);
  const { fullPath } = route;
  console.log(state.fullPathList.indexOf(fullPath) < 0);
  if (state.fullPathList.indexOf(fullPath) < 0) {
    state.fullPathList.push(fullPath);
    state.pages.push(route);
    state.activeKey = fullPath;
  }
});
</script>

<style lang="less" scoped>
.multi-tab {
  /deep/ .ant-tabs-nav {
    margin: 0;
    .ant-tabs-nav-wrap {
      background-color: white;

      .ant-tabs-tab {
        padding: 4px 8px;
        .ant-tabs-tab-btn {
          user-select: none;
        }
      }
    }
  }
}
</style>
