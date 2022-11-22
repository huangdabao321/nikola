<template>
  <div>
    <Form>
      <Form.Item label="手机号">
        <Input />
      </Form.Item>
      <Form.Item label="密码">
        <Input.Password />
      </Form.Item>
      <Button type="primary" block>登陆</Button>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { Form, Input, Button } from "ant-design-vue";
</script>

<style scoped></style>
