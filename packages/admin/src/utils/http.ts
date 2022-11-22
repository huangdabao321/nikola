import axios from "axios";
import { message } from "ant-design-vue";
import useLocalStorage from "@/hooks/useLocalStorage";
const { setItem, getItem, removeItem } = useLocalStorage();
const ACCESS_TOKEN = "accessToken";
const instance = axios.create({
  timeout: 1000,
});

// 请求失败处理
const requestErrorHandler = (error: any) => {
  return Promise.reject(error);
};

// 返回失败处理
const responseErrorHandler = (error: any) => {
  const { data, status } = error;
  switch (status) {
    case 401:
      message.error("token过期");
      removeItem(ACCESS_TOKEN);
      break;
    default:
      return Promise.reject(data);
      break;
  }
};

instance.interceptors.request.use((config) => {
  const accessToken = getItem(ACCESS_TOKEN);
  if (accessToken) {
    return {
      ...config,
      headers: {
        ...config.headers,
        Auth: `Berear ${accessToken}`,
      },
    };
  }
  return config;
}, requestErrorHandler);

instance.interceptors.response.use((response) => {
  const { data } = response;
  const { accessToken, expire } = data;
  if (accessToken) {
    setItem(ACCESS_TOKEN, accessToken, expire);
  }
  return data;
}, responseErrorHandler);

export default instance;
