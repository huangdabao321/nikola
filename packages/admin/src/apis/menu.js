import request from './request'

/**
 * 侧边栏菜单
 */
export function getMenus(){
  return request({
    url: '/api/menus',
    method: 'get'
  })
}