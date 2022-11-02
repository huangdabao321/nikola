import request from "./request";

/**
 * 登陆
 * @param {name, pwd} params 
 * @returns 
 */
export function login(params) {
  return request({
    url: "/api/login",
    method: "POST",
    data: params,
  });
}

/**
 * 获取用户信息
 * @param {} params 
 * @returns 
 */
export function getUserInfo(params) {
  return request({
    url: "/api/userinfo",
    method: "get",
    params: params,
  });
}
