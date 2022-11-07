<template>
  <a-tabs
    hideAdd
    @edit="onEdit"
    v-model:activeKey="state.activeKey"
    type="editable-card"
  >
    <a-tab-pane v-for="page in pages" :key="page.fullPath">
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
import { reactive, watchEffect, ref, unref, isRef } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const state = reactive({
  fullPathList: [],
  activeKey: "",
});

const pages = ref([]);

const onEdit = (targetKey) => {
  remove(targetKey);
};

const remove = (targetKey) => {
  if (state.fullPathList.length > 1) {
    let lastIndex = 0;
    pages.value.forEach((page, i) => {
      if (page.fullPath === targetKey) {
        lastIndex = i - 1;
      }
    });
    state.fullPathList = state.fullPathList.filter((key) => key !== targetKey);
    pages.value = unref(
      pages.value.filter((page) => page.fullPath !== targetKey),
    );
    const temp = pages.value.filter((page) => page.fullPath !== targetKey)
    console.log('temp', isRef(temp))
    state.activeKey = pages[lastIndex].fullPath;
    router.push(state.activeKey);
  }
};

watchEffect(() => {
  const route = unref(router.currentRoute.value);
  const { fullPath } = route;
  console.log(state.fullPathList.indexOf(fullPath) < 0);
  if (state.fullPathList.indexOf(fullPath) < 0) {
    state.fullPathList.push(fullPath);
    pages.value.push(route);
    state.activeKey = fullPath;
  }
});
</script>

<style lang="less" scoped></style>
