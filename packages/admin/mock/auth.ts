import { MockMethod } from "vite-plugin-mock";

module.exports = [
  {
    method: "post",
    url: "/api/user/login",
    rawResponse: async (req, res) => {
      let role = "test";
      await new Promise((resolve) => {
        req.on("data", (chunk) => {
          const { mobile, password } = JSON.parse(chunk.toString());
          mobile === "15172361339" && password === "123456" && (role = "admin");
        });
        req.on("end", () => resolve(null));
      });
      res.setHeader("Content-Type", "text/json");
      res.statusCode = 200;
      const data = {
        data: {
          accessToken: `faker ${role}token`,
          expire: 3 * 60 * 60,
        },
      };

      const ret = JSON.stringify(data);
      res.end(ret);
    },
  },
] as MockMethod[];
