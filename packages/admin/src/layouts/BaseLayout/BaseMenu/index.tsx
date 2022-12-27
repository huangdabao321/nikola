import {  defineComponent, ref } from "vue";
import { Menu } from "ant-design-vue";
import { useAppStore } from "@/store";
import { storeToRefs } from "pinia";
import type { RouteRecordRaw, RouteMeta } from "vue-router";
import { useRouter, useRoute } from "vue-router";
import { isUrl } from '@nikola/utils/is'
import { listenerRouteChange } from "@/utils/routeChange";
import { useMenuTree } from './use-menu-tree'
import Icon from '@/components/Icon/index.vue'

export default defineComponent({
  name: "BaseMenu",
  setup(props) {
    const appStore = useAppStore();
    const { menus } = storeToRefs(appStore);
    const selectedKeys = ref<string[]>([])
    const openKeys = ref<string[]>([])
    const { menuTree } = useMenuTree()

    const handleMenuClick = (item: RouteRecordRaw) => {
      go(item)
    }

    const router = useRouter()
    const route = useRoute()

    const go = (item: RouteRecordRaw):void => {
      const fullPath = item.path
      const target = item?.meta?.target as string
      if (target && isUrl(target)) {
        window.location.href = target
        selectedKeys.value = [item.name as string]
        return
      }
      const { hideInMenu } = item.meta as RouteMeta
      if (route.name === item.name && !hideInMenu) {
        return
      }
      router.push({ name: item.name })
    }

    const findMenuOpenKeys = (name: string) => {
      const result: string[] = []
      let isFind = false
      const backtrack = (item: RouteRecordRaw, keys: string[], target: string) => {
        if (item.name === target) {
          isFind = true
          result.push(...keys, item.name)
          return
        }
        if (item.children?.length) {
          item.children.forEach((el) => {
            backtrack(el, [...keys], target)
          })
        }
      }
      menuTree.value.forEach((el: RouteRecordRaw) => {
        if (isFind) {
          return
        }
        backtrack(el, [el.name as string], name)
      })
      return result
    }

    listenerRouteChange((newRoute) => {
      const { hideInMenu } = newRoute.meta
      if (!hideInMenu) {
        const menuOpenKeys = findMenuOpenKeys( newRoute.name as string)
        const keySet = new Set([...menuOpenKeys])
        openKeys.value = [...keySet]
        selectedKeys.value = [ menuOpenKeys[menuOpenKeys.length - 1] ]
      }
    }, true )

    const renderIcon = (item : any) => {
      return item.meta && item.meta.icon ? () => <Icon icon={ item?.meta?.icon as string } /> : null
    }

    const renderMenuItem = (item: RouteRecordRaw) => {
      
      return <Menu.Item 
                key={item.name}
                onClick={() => handleMenuClick(item)}
                v-slots={{
                  icon: renderIcon(item)
                }}
              >{ item?.meta?.title }</Menu.Item>
    }

    const renderSubMenu = (records: RouteRecordRaw[], nodes: any = []) => {
      const len = records.length
      for (let i = 0; i < len; i++) {
        const element = records[i];
        const hideInMenu = element?.meta?.hideInMenu
        const hideChidlren = element?.meta?.hideChidlren
        const children = element?.children
        let node = null
        if (!hideInMenu && !children) {
          node = renderMenuItem(element)
          nodes.push(node)
        }
        if (!hideInMenu && children && !hideChidlren) {
          node = <Menu.SubMenu
                    key={element.name}
                    v-slots={{icon: renderIcon(element), title: () => element?.meta?.title }}
                  >{renderSubMenu(children)}</Menu.SubMenu>
          nodes.push(node)
        }
        if (hideInMenu && children && !hideChidlren) {
          node = renderSubMenu(children)
          nodes.push(node)
        }
      }
      return nodes
    }
    return () => (
      <Menu
        theme="dark"
        mode="inline"
        v-model:selectedKeys={selectedKeys.value}
        v-model:openKeys={openKeys.value}
      >
        { renderSubMenu(menus.value) }
      </Menu>
    );
  },
});
