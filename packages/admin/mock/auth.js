export default [
  {
    url: "/api/login",
    method: "post",
    response: ({ body }) => {
      if (body.name === "admin") {
        return {
          code: 0,
          data: {
            accessToken: "adminToken",
            expireIn: 36000,
          },
        };
      }
      return {
        code: 0,
        data: {
          accessToken: "testToken",
          expireIn: 36000
        },
      };
    },
  },
  {
    url: "/api/userinfo",
    method: "get",
    response: ({ body, headers }) => {
      return {
        code: 0,
        data: {
          id: 1,
          name: "admin",
          avatar:
            "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
          // "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
          roles: ['admin'],
          permissions: []
        },
      };
    },
  },
];
