// import { MockMethod } from "vite-plugin-mock";
export default [
  {
    url: "/api/login",
    method: "get",
    response: ({ query }) => {
      if (query.name === 'admin') {
        return {
          code: 0,
          data: {
            accessToken: "adminToken",
            expireIn: 36000,
          },
        }
      }
      return {
        code: 0,
        data: {
          accessToken: "testToken",
          expireIn: 36000,
        },
      };
    },
  },
  {
    url: "/api/userinfo",
    method: "get",
    response: ({ query }) => {
      console.log('>>>>>>>',query)
      return {
        code: 0,
        data: {
          name: "admin",
          avatar:
            "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
          // "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        },
      };
    },
  },
];
