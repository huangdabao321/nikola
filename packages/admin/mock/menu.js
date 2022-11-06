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
            permissions: ['index'],
            hideInMenu: false,
            keepAlive: true
          },
          {
            id: 2,
            pid: 1,
            name: 'welcome',
            title: '欢迎页',
            path: '/welcome',
            component: 'welcome',
            permissions: ['index'],
            hideInMenu: false,
            keepAlive: true
          },
          {
            id: 3,
            pid: 1,
            name: 'usercenter',
            title: '个人中心',
            path: '/usercenter',
            component: 'profile/index',
            permissions: [],
            // 在菜单中隐藏自己
            hideInMenu: false,
            // 在菜单中隐藏子节点
            hideChildInMenu: false,
            keepAlive: true
          },
          {
            id: 4,
            pid: 1,
            name: 'activity',
            title: '活动管理',
            path: '/activity',
            component: 'activity/index',
            permissions: [],
            // 在菜单中隐藏自己
            hideInMenu: false,
            // 在菜单中隐藏子节点
            hideChildInMenu: false,
            keepAlive: true
          },
        ]
      }
    }
  }
]