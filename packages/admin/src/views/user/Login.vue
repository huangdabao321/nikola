<template>
  <div class="form-wrap">
    <div class="logo-wrap">
      <span>{{ title }}</span>
    </div>
    <Form
      validateTrigger="blur"
      :model="formState"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 20 }"
      :rules="rules"
      :validateOnRuleChange="false"
      @finish="handleFinish"
    >
      <Form.Item label="手机" has-feedback name="mobile">
        <Input v-model:value="formState.mobile" />
      </Form.Item>
      <Form.Item label="密码" has-feedback name="password">
        <Input.Password v-model:value="formState.password" />
      </Form.Item>
      <Form.Item :label-col="{ span: 0 }" :wrapper-col="{ span: 24 }">
        <Button type="primary" block html-type="submit">登陆</Button>
      </Form.Item>
    </Form>
    <div v-if="isWechatEnv">
      <Divider>其他登陆方式</Divider>
      <RouterLink to="/wechat/login"
        ><wechat-outlined class="icon"
      /></RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Form, Input, Button, Divider, message } from "ant-design-vue";
import type { Rule } from "ant-design-vue/es/form";
import { WechatOutlined } from "@ant-design/icons-vue";
import { getTitle, isWechatEnv } from "@/utils/util";
import useUserStore from "@/store/user";
import { useRouter } from "vue-router";
import { reactive, toRaw, unref } from "vue";

interface FormState {
  mobile: string;
  password: string;
}

interface errorResult {
  message?: string;
}

const formState = reactive<FormState>({
  mobile: "",
  password: "",
});

const rules: Record<string, Rule[]> = {
  mobile: [
    { required: true, message: "请填写手机号" },
    { pattern: /^1\d{10}$/, message: "手机号错误" },
  ],
  password: [
    { required: true, message: "请填写密码" },
    { pattern: /^[A-Za-z-_0-9]{6,16}$/, message: "密码6-16位之间" },
  ],
};

const useStore = useUserStore();
const router = useRouter();
const handleFinish = (values: FormState) => {
  useStore
    .login(values)
    .then(() => {
      message.success("欢迎回来!");
      router.push("/welcome");
    })
    .catch((error: errorResult) => {
      message.error(error.message);
    });
};

const title = getTitle();
</script>

<style scoped lang="less">
.form-wrap {
  display: flex;
  flex-direction: column;
  width: 80%;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 2px 7px 1px #fefafa75;

  .logo-wrap {
    text-align: center;
    font-size: 28px;
  }
  .icon {
    font-size: 28px;
    color: rgb(7, 193, 92);
  }
}
</style>
