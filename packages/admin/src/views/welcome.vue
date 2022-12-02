<template>
  <div class="wrap">
    <span
      class="item"
      v-for="color in colors"
      :style="{
        background: color,
      }"
      @click="handleClick(color)"
    ></span>
  </div>
  <Space>
    <Button type="primary">clik</Button>
    <Button type="ghost">clik</Button>
    <Button type="dashed">clik</Button>
    <Button type="link">clik</Button>
    <Button type="text">clik</Button>
    <Button type="default">clik</Button>
    <Button danger type="primary">clik</Button>
    <Button danger type="ghost">clik</Button>
    <Button danger type="dashed">clik</Button>
    <Button danger type="link">clik</Button>
    <Button danger type="text">clik</Button>
    <Button danger type="default">clik</Button>
  </Space>
  <div>
    <Space>
      <PieChartTwoTone />
    </Space>
  </div>
  <div>
    <Space>
      <TypographyText type="secondary">尼古拉斯宝哥</TypographyText>
      <TypographyText type="success">尼古拉斯宝哥</TypographyText>
      <TypographyText type="warning">尼古拉斯宝哥</TypographyText>
      <TypographyText type="danger">尼古拉斯宝哥</TypographyText>
      <TypographyText disabled>尼古拉斯宝哥</TypographyText>
      <TypographyText mark>尼古拉斯宝哥</TypographyText>
      <TypographyText code>尼古拉斯宝哥</TypographyText>
      <TypographyText keyboard>尼古拉斯宝哥</TypographyText>
      <TypographyText underline>尼古拉斯宝哥</TypographyText>
      <TypographyText delete>尼古拉斯宝哥</TypographyText>
      <TypographyText strong>尼古拉斯宝哥</TypographyText>
      <TypographyText delete>尼古拉斯宝哥</TypographyText>
    </Space>
  </div>
  <div>
    <Space>
      <Affix :offset-top="bottom">
        <Button type="primary" @click="bottom += 10">clik</Button>
      </Affix>
    </Space>
  </div>
  <div>
    <Steps :current="1" status="error">
      <Step title="Finished" description="This is a description." />
      <Step title="In Progress" description="This is a description." />
      <Step title="Waiting" description="This is a description." />
    </Steps>
  </div>
  <div>
    <Alert message="Success Tips" type="success" show-icon />
    <Alert message="Informational Notes" type="info" show-icon />
    <Alert message="Warning" type="warning" show-icon />
    <Alert message="Error" type="error" show-icon />
    <Alert
      message="Success Tips"
      description="Detailed description and advices about successful copywriting."
      type="success"
      show-icon
    />
    <Alert
      message="Informational Notes"
      description="Additional description and informations about copywriting."
      type="info"
      show-icon
    />
    <Alert
      message="Warning"
      description="This is a warning notice about copywriting."
      type="warning"
      show-icon
    />
    <Alert
      message="Error"
      description="This is an error message about copywriting."
      type="error"
      show-icon
    />
  </div>
  <div>
    <Row :gutter="16">
      <Col :span="24">
        <Progress :percent="30" />
        <Progress :percent="70" status="exception" />
        <Progress :percent="100" />
      </Col>
      <Col span="24">
        <Progress type="circle" :percent="75" />
        <Progress type="circle" :percent="70" status="exception" />
        <Progress type="circle" :percent="100" />
      </Col>
    </Row>
  </div>
</template>

<script lang="ts" setup>
import {
  Button,
  Space,
  Typography,
  Affix,
  Steps,
  Alert,
  ConfigProvider,
  Row,
  Col,
  Progress,
} from "ant-design-vue";
import { PieChartTwoTone } from "@ant-design/icons-vue";
import { ref } from "vue";

const TypographyText = Typography.Text;
const Step = Steps.Step;

const bottom = ref(10);

const colors = [
  "#1890ff",
  "#0960bd",
  "#0084f4",
  "#009688",
  "#536dfe",
  "#ff5c93",
  "#ee4f12",
  "#0096c7",
  "#9c27b0",
  "#ff9800",
];

const handleClick = async (color: string) => {
  ConfigProvider.config({
    theme: {
      primaryColor: color,
    },
  });
};
</script>

<style lang="less" scoped>
.wrap {
  display: flex;
}
.item {
  width: 20px;
  height: 20px;
  margin: 16px;
  &:active {
    border: 1px solid white;
  }
}
</style>
