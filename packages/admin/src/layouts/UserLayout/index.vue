<template>
  <div class="user-layout">
    <Row class="container">
      <Col :sm="0" :md="12" class="left"></Col>
      <Col :xs="24" :sm="24" :md="12" class="right"><RouterView /></Col>
    </Row>
    <GlobalFooter />
  </div>
</template>

<script lang="ts">
import { Row, Col } from "ant-design-vue";
import { defineComponent } from "vue";
import GlobalFooter from "@/components/GlobalFooter.vue";
export default defineComponent({
  name: "UserLayout",
  components: {
    Row,
    Col,
    GlobalFooter,
  },
});
</script>

<style scoped lang="less">
.user-layout {
  height: 100vh;
  overflow: hidden;
  background: rgb(175, 205, 251);
}
.container {
  height: 100%;
}
.left {
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("@/assets/login-bg.svg");
    background-repeat: no-repeat;
    background-position: center;
  }
}
.right {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
