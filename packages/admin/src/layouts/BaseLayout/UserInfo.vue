<template>
  <a-dropdown>
    <template #overlay>
      <a-menu @click="handleMenuClick">
        <a-menu-item key="1">
          <UserOutlined />
          个人中心
        </a-menu-item>
        <a-menu-item key="2">
          <LogoutOutlined />
          退出登陆
        </a-menu-item>
      </a-menu>
    </template>
    <a-avatar :src="user.avatar" />
    <span>{{ user.name }}</span>
  </a-dropdown>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useUserStore } from "../../stores/user";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const router = useRouter();
const handleMenuClick = ({ key }) => {
  console.log("key", key);
  key === "1" && router.push({ name: "usercenter" });
  key === "2" && userStore.logout();
};
</script>

<style lang="less" scoped></style>
