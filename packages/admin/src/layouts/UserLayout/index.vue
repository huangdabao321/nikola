<template>
  <a-row class="wrap">
    <a-col :sm="0" :md="8"></a-col>
    <a-col :sm="24" :md="8">
      <router-view></router-view>
    </a-col>
    <a-col :sm="0" :md="8"></a-col>
  </a-row>
  <footer>
    <a href="https://beian.miit.gov.cn/">鄂ICP备18022120号-1</a>
  </footer>
</template>

<script setup>

</script>

<style lang="less" scoped>
.wrap{
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100vw;
  height: 100vh;
  background: url('@/assets/login-bg.jpg');
  background-size: cover;
  background-repeat: no-repeat;
}
footer{
  position: fixed;
  z-index: 1;
  bottom: 0;
  height: 40px;
  width: 100%;
  text-align: center;
  a{
    color: white;
  }
}
</style>