<template>
  <a-layout-sider
    breakpoint="lg"
    collapsedWidth="0"
    :collapsed="collapsed"
    @collapse="onCollapse"
    @breakpoint="onBreakpoint"
    :style="{
      overflow: 'auto',
      height: '100vh'
    }"
  >
  <div class="logo">
      <img src="@/assets/logo.png" alt="logo">
    </div>
    <a-menu theme="dark" mode="inline">
      <a-menu-item key="1">
        <user-outlined></user-outlined>
        <span class="nav-text">nav 1</span>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script setup>
import { UserOutlined } from '@ant-design/icons-vue';
const props = defineProps({
  collapsed: {
    type: Boolean,
    default: false
  }
})
const onCollapse = (collapsed, type) => {
  console.log(collapsed, type)
}
const onBreakpoint = (broken) => {
  console.log(broken)
}
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
