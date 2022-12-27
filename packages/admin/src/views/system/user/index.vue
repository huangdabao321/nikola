<template>
  <Card title="人员管理">
    <Row :gutter="[16, 16]">
      <Col :xs="24" :sm="24" :md="24" :lg="20">
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
                  allowClear
                />
              </Form.Item>
            </Col>
            <Col :xs="24" :sm="24" :md="8">
              <Form.Item label="手机">
                <Input
                  v-model:value="formState.mobile"
                  placeholder="请输入用户手机"
                  allowClear
                />
              </Form.Item>
            </Col>
            <Col :xs="24" :sm="24" :md="8">
              <Form.Item label="角色">
                <Select
                  v-model:value="formState.roleIds"
                  placeholder="请输入用户手机"
                  allowClear
                  mode="multiple"
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
      <Col :xs="24" :sm="24" :md="24" :lg="4">
        <Space direction="vertical">
          <Button type="primary" @click="handleSearch">
            <template #icon><SearchOutlined /></template>
            查询
          </Button>
          <Button @click="handleReset">
            <template #icon><RedoOutlined /></template>
            重置
          </Button>
        </Space>
      </Col>
    </Row>
    <Divider />
    <Row type="flex" justify="space-between" style="margin-bottom: 20px">
      <Col>
        <Button type="primary" @click="handleAdd">
          添加人员
          <template #icon><plus-outlined /></template>
        </Button>
      </Col>
    </Row>
    <Table row-key="id" :columns="columns" :data-source="data" />
    <Drawer v-model:visible="visible" :title="editTitle">
      <Form name="edit-from" @finish="onSubmit">
        <Form.Item label="姓名">
          <Input
            v-model:value="editForm.name"
            allow-clear
            placeholder="请填写姓名"
          />
        </Form.Item>
        <Form.Item label="手机">
          <Input
            v-model:value="editForm.mobile"
            allow-clear
            placeholder="请填写手机号"
          />
        </Form.Item>
        <Form.Item label="密码">
          <Input
            v-model:value="editForm.password"
            type="password"
            allow-clear
            placeholder="请填写密码"
          />
        </Form.Item>
        <Form.Item label="角色">
          <Select
            v-model:value="editForm.roleIds"
            mode="multiple"
            allow-clear
            placeholder="请分配角色"
          >
            <Select.Option :value="1">管理员</Select.Option>
            <Select.Option :value="2">执行老师</Select.Option>
            <Select.Option :value="3">门店管理员</Select.Option>
          </Select>
        </Form.Item>
        <Button type="primary" block html-type="submit">提交</Button>
      </Form>
    </Drawer>
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
  message,
  Drawer,
} from "ant-design-vue";
import {
  PlusOutlined,
  SearchOutlined,
  RedoOutlined,
} from "@ant-design/icons-vue";
import { computed, onMounted, reactive, ref } from "vue";
import type { UnwrapRef } from "vue";
import { useAppStore } from "@/store";
import { getUsers, addUsers } from "@/api/user";
import { UserState } from "@/store/modules/user/types";

interface FormState {
  layout: "horizontal" | "vertical" | "inline";
  name: string;
  mobile: string;
  roleIds: number[];
}

const formState: UnwrapRef<FormState> = reactive({
  layout: "horizontal",
  name: "",
  mobile: "",
  roleIds: [],
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

const appStore = useAppStore();

const data = ref<UserState[]>([]);

const handleSearch = () => {
  const params = {
    name: formState.name,
    mobile: formState.mobile,
    roleIds: formState.roleIds,
  };
  getUsers(params)
    .then((res) => {
      console.log("res", res.data);
      data.value = res.data;
    })
    .catch((error) => {
      message.error(error.message);
    });
};

onMounted(() => {
  handleSearch();
});

const handleReset = () => {
  formState.name = "";
  formState.mobile = "";
  formState.roleIds = [];
};

const visible = ref<boolean>(false);
const editTitle = ref("添加人员");
const handleAdd = () => {
  visible.value = true;
};

const onSubmit = () => {
  addUsers({
    name: editForm.name,
    mobile: editForm.mobile,
    password: editForm.password,
    roleIds: editForm.roleIds,
  })
    .then((res) => {
      message.success("添加成功!");
    })
    .catch((error) => {
      message.error(error.message);
    });
};

const editForm = reactive({
  name: "",
  mobile: "",
  password: "",
  roleIds: [],
});

const columns = [
  {
    key: "name",
    title: "姓名",
    dataIndex: "name",
  },
  {
    key: "mobile",
    title: "手机",
    dataIndex: "mobile",
  },
  {
    key: "avatar",
    title: "头像",
    dataIndex: "avatar",
  },
  {
    key: "createdAt",
    title: "创建时间",
    dataIndex: "createdAt",
  },
];
</script>

<style scoped></style>
