import { MockMethod } from "vite-plugin-mock";

import { adminMenu, teacherMenu } from "./model/menus";

export default [
  {
    url: "/api/userinfo",
    method: "get",
    response: ({ headers }) => {
      const { authorization } = headers;
      if (!authorization) {
        return {
          message: "Invalid token",
        };
      }
      if (authorization.includes("admintoken")) {
        return {
          code: 0,
          data: {
            id: 1,
            name: "管理员",
            nickname: "",
            avatar:
              "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
            mobile: "",
            openid: "",
            roles: [
              {
                id: 1,
                name: "admin",
                desc: "管理员",
                permissions: [...adminMenu],
              },
            ],
          },
        };
      } else {
        // 测试账号
        return {
          code: 0,
          data: {
            id: 2,
            name: "测试账号",
            nickname: "",
            openid: "",
            mobile: "",
            roles: [
              {
                id: 2,
                name: "teacher",
                desc: "执行老师",
                permissions: [...teacherMenu],
              },
            ],
          },
        };
      }
    },
  },
] as MockMethod[];
