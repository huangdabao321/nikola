import request from "@/utils/http";

interface MenuParams {
  page?: number;
  pagination?: number;
}

export function getMenus(params?: MenuParams) {
  return request({
    method: "get",
    url: "/api/menus",
    params,
  });
}
