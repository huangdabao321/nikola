import request from "@/utils/http";
import { UserState, Access } from "@/store/modules/user/types";

export interface LoginData {
  mobile: string;
  password: string;
}

// 用户登陆
export function userLogin(data: LoginData) {
  return request.post<Access>("/api/user/login", data);
}

// 获取用户信息
export function getUserinfo() {
  return request.get<UserState>("/api/userinfo");
}
