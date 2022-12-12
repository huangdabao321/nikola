<template>
  <Card title="人员管理">
    <Row>
      <Col :flex="1">
        <Form
          :layout="formState.layout"
          label-align="left"
          v-bind="formItemLayout"
        >
          <Row :gutter="16">
            <Col :xs="24" :sm="24" :md="8">
              <Form.Item label="姓名">
                <Input
                  v-model:value="formState.name"
                  placeholder="请输入用户姓名"
                />
              </Form.Item>
            </Col>
            <Col :xs="24" :sm="24" :md="8">
              <Form.Item label="手机">
                <Input
                  v-model:value="formState.mobile"
                  placeholder="请输入用户手机"
                />
              </Form.Item>
            </Col>
            <Col :xs="24" :sm="24" :md="8">
              <Form.Item label="角色">
                <Select
                  v-model:value="formState.roleId"
                  placeholder="请输入用户手机"
                >
                  <Select.Option value="1">管理员</Select.Option>
                  <Select.Option value="2">执行老师</Select.Option>
                  <Select.Option value="3">门店管理员</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Col>
      <Divider type="vertical" style="height: 84px" />
      <Col flex="86px">
        <Space direction="vertical">
          <Button type="primary">
            <template #icon><SearchOutlined /></template>
            查询
          </Button>
          <Button>
            <template #icon><RedoOutlined /></template>
            重置
          </Button>
        </Space>
      </Col>
    </Row>
    <Divider />
    <Row type="flex" justify="space-between" style="margin-bottom: 20px">
      <Col>
        <Button type="primary">
          添加人员
          <template #icon><plus-outlined /></template>
        </Button>
      </Col>
      <Col>
        <Button type="default">
          下载
          <template #icon><DownloadOutlined /></template>
        </Button>
      </Col>
    </Row>
    <Table />
  </Card>
</template>

<script setup lang="ts">
import {
  Card,
  Divider,
  Table,
  Row,
  Col,
  Form,
  Input,
  Button,
  Space,
  Select,
} from "ant-design-vue";
import {
  PlusOutlined,
  DownloadOutlined,
  SearchOutlined,
  RedoOutlined,
} from "@ant-design/icons-vue";
import { computed, reactive, ref } from "vue";
import type { UnwrapRef } from "vue";

interface FormState {
  layout: "horizontal" | "vertical" | "inline";
  name: string;
  mobile: string;
  roleId: string;
}

const formState: UnwrapRef<FormState> = reactive({
  layout: "horizontal",
  name: "",
  mobile: "",
  roleId: "",
});

const formItemLayout = computed(() => {
  const { layout } = formState;
  return layout === "horizontal"
    ? {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
      }
    : {};
});
</script>

<style scoped></style>
