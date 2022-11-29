import { Role, Permission } from "@/router/types";
import request from "@/utils/http";

interface userInfo {
  id: number;
  name: string;
  nickname: string;
  openid: string;
  roles: Role[];
}

interface loginType {
  mobile: string;
  password: string;
}
// 用户登陆
export function userLogin(params: loginType) {
  return request({
    method: "POST",
    url: "/api/user/login",
    data: params,
  });
}

// 获取用户信息
export function getUserinfo(): Promise<userInfo> {
  return request({
    method: "GET",
    url: "/api/userinfo",
  });
}
