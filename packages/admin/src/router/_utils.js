import { getMenus } from "@/apis/menu";
import { BaseLayout, RouterView } from "@/layouts";

const modules = import.meta.glob(["../views/*/*.vue", "../views/*.vue"]);

const constRouterComponents = {
  BaseLayout,
  RouterView,
};
/**
 * 动态生成菜单
 * @param { array } roles
 */
export function generateMenus(roles) {
  return new Promise((resolve, reject) => {
    getMenus()
      .then((res) => {
        const { data } = res;
        const menus = [];
        listToTree(data, menus, 0);
        const routes = transformData(menus);
        resolve(routes);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function transformData(data) {
  return data.map((item) => {
    const route = {
      id: item.id,
      pid: item.pid,
      name: item.name,
      path: item.path,
      component:
        constRouterComponents[item.component] ||
        modules[`../views/${item.component}.vue`],
      meta: {
        title: item.title,
        icon: item.icon || "",
        permissions: [...item.permissions],
        keepAlive: item.keepAlive,
        // 菜单栏是否显示
        hideInMenu: item.hideInMenu,
        // 菜单子菜单是否显示
        hideChildInMenu: item.hideChildInMenu,
      },
    };
    // 重定向
    item.redirect && (route.redirect = item.redirect);
    if (item.children && item.children.length) {
      route.children = transformData(item.children);
    }
    return route;
  });
}

/**
 *
 * @param { array } data 源数组
 * @param { array } menus 菜单
 * @param { number } pid 父级id
 */
function listToTree(data, menus, pid) {
  data.forEach((item) => {
    if (item.pid === pid) {
      const child = {
        ...item,
        children: [],
      };

      listToTree(data, child.children, item.id);

      !child.children.length && delete child.children;
      menus.push(child);
    }
  });
}
