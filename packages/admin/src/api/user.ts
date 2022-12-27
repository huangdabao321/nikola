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

interface UsersParams {
  name?: string;
  mobile?: string;
  roleIds?: number[];
}
// 获取用户列表
export function getUsers(params: UsersParams) {
  return request.get<UserState[]>("/api/users", { params });
}

interface UsersData {
  name?: string;
  mobile?: string;
  password?: string;
  roleIds?: number[];
}
// 添加用户
export function addUsers(data: UsersData) {
  return request.post("/api/users", { data });
}
