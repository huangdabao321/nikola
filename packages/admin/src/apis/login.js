import request from "./request";

export function login(params) {
  return request({
    url: "/api/login",
    method: "POST",
    data: params,
  });
}
