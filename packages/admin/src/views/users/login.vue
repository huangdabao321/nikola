<template>
  <div class="container">
    <div class="inner-wrap">
      <div class="logo">
        <img src="@/assets/logo.png" alt="" />
      </div>
      <a-form :form="formState">
        <a-form-item label="账号">
          <a-input v-model:value="formState.name" />
        </a-form-item>
        <a-form-item label="密码">
          <a-input-password v-model:value="formState.pwd" />
        </a-form-item>
        <a-form-item class="tip" v-if="isWechat">
          <span class="text">其他登陆方式:</span>
          <wechat-outlined class="icon" @click="onWechatLogin"/>
        </a-form-item>
        <a-form-item>
          <a-button block type="primary" shape="round" @click="onSubmit">
            登陆
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, toRaw } from "vue";
import { login } from "@/apis/login";
import { WechatOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { useRouter } from 'vue-router'
import { isWechat } from "@nikola/utils";

const formState = reactive({
  name: "admin",
  pwd: 123456,
});

const onSubmit = () => {
  login(toRaw(formState))
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
      // message.error(error.msg);
    });
};

const router = useRouter()
const onWechatLogin = () => {
  router.push('/wechat/login')
}
</script>

<style lang="less" scoped>
.container {
  padding: 20px;
  .inner-wrap {
    padding: 20px;
    background-color: rgba(238, 238, 238, 0.726);
    border-radius: 8px;
    box-shadow: 0 1px 14px 4px rgba(238, 238, 238, 0.514);
  }
  .logo {
    text-align: center;
    margin-bottom: 20px;
    img {
      width: 200px;
    }
  }
  .tip {
    .text {
      font-size: 18px;
      margin-right: 20px;
      color: white;
    }
    .icon{
      padding: 6px;
      color: green;
      font-size: 30px;
    }
  }
}
</style>
