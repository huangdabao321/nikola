import { adminMenu, teacherMenu } from "./model/menus";
import { MockMethod } from "vite-plugin-mock";
import { Permission } from "../src/store/modules/user/types";
type data = {
  data: Permission[];
};
export default [
  {
    url: "/api/menus",
    method: "get",
    rawResponse: (req, res) => {
      const data: data = { data: [] };
      const { authorization } = req.headers;
      if (!authorization) {
        res.statusCode = 401;
        res.end(
          JSON.stringify({
            message: "Invalid token",
          })
        );
      }
      if (authorization?.includes("admintoken")) {
        // 管理员菜单
        data.data = adminMenu;
      } else {
        // 其他测试菜单
        data.data = teacherMenu;
      }
      const dataStr = JSON.stringify(data);
      res.setHeader("Content-Type", "text/json");
      res.statusCode = 200;
      res.end(dataStr);
    },
  },
] as MockMethod[];
