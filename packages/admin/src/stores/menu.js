import { defineStore } from "pinia";
import { isUrl } from '@nikola/utils'

export const useMenuStore = defineStore('menu', {
  state: () => {
    return {
      menus: []
    }
  },
  actions: {
    setMenu(val) {
      this.menus = val
    }
  },
  getters: {
    sideMenus() {
      // 从根目录往下找
      const childrenRoute = this.menus.find(route => route.path === '/')
      let tempRoutes =  formatRelativePath(childrenRoute?.children || [])
      let routes = filterHideRoute(tempRoutes)  
      return routes
    }
  }
})

function filterHideRoute(routes) {
  return routes.filter(route => {
    // 如果隐藏菜单 
    if (route.meta.hideInMenu) {
      return false
    } 
    // 如果隐藏子菜单 删除菜单
    if (route.meta.hideChildInMenu && route.children && route.children.length > 0) {
      delete route.children
    }
    if (route.children && route.children.length > 0) {
      route.children = filterHideRoute(route.children)
    }
    return true
  })
}

// 路由路径格式化
function formatRelativePath(routes, parent){
  return routes.map(route => {
    if (isUrl(route.path)) {
      return route
    }

    const hasRelativePath = route.path.startsWith('/')
    if (!hasRelativePath) {
      if (parent) {
        route.path = `${parent.path || ''}/${route.path}`
      } else {
        route.path = `/${route.path}`
      }
    }
    route.path = route.path.replace('//', '/')
    if (route.children && route.children.length > 0) {
      route.children = formatRelativePath(route.children, route)
    }
    return route
  })
}
