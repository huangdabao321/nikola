import axios from "axios";
import { message } from "ant-design-vue";
import useLocalStorage from "@/hooks/useLocalStorage";
import { ACCESSTOKEN } from "@/store/modules/user/constants";

const { getItem, removeItem } = useLocalStorage();

const instance = axios.create({
  timeout: 1000,
});

// 请求失败处理
const requestErrorHandler = (error: any) => {
  console.log("requestErrorHandler", error);
  return Promise.reject(error);
};

// 返回失败处理
const responseErrorHandler = (error: any) => {
  const { status } = error.response;
  switch (status) {
    case 401:
      message.error("token过期");
      removeItem(ACCESSTOKEN);
      break;
    default:
      break;
  }
  return Promise.reject(error);
};
// 请求拦截器
instance.interceptors.request.use((config) => {
  const accessToken = getItem(ACCESSTOKEN);
  if (accessToken) {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Berear ${accessToken}`,
      },
    };
  }
  return config;
}, requestErrorHandler);

// 返回拦截器
instance.interceptors.response.use((response) => {
  const data = response.data;
  return data;
}, responseErrorHandler);

export default instance;
