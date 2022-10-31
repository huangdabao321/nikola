<template>
  <div class="wrap">
    <div class="img">
      <a-button type="primary" @click="onHome">返回首页</a-button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()

const onHome = () => {
  router.push('/')
}
</script>

<style lang="less" scoped>
.wrap{
  width: 100vw;
  height: 100vh;
  background: white;
  .img{
    display: flex;
    align-items: center;
    justify-content: center;
    background: url('@/assets/404.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    height: 100%;
    width: 100%;
  }
}
</style>