export default [
  {
    url: '/api/menus',
    method: 'get',
    response: ()=> {
      return {
        code: 0,
        data: [
          {
            id: 1,
            pid: 0,
            name: 'index',
            title: '首页',
            path: '/',
            redirect: '/welcome',
            component: 'BaseLayout',
            permissions: ['index']
          },
          {
            id: 2,
            pid: 1,
            name: 'welcome',
            title: '欢迎页',
            path: 'welcome',
            component: 'welcome',
            permissions: ['index']
          },
          {
            id: 3,
            pid: 1,
            name: 'usercenter',
            title: '个人中心',
            path: 'usercenter',
            component: 'profile/index',
            permissions: []
          }
        ]
      }
    }
  }
]