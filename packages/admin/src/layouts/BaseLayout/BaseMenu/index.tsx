import { defineComponent, unref, toRefs, ref } from "vue";
import { Menu } from "ant-design-vue";
import { useAppStore } from "@/store";
import { storeToRefs } from "pinia";
import type { RouteRecordRow, RouteMeta } from "vue-router";
import { useRouter, useRoute } from "vue-router";
import { isUrl } from '@nikola/utils/is'


const BaseMenu = defineComponent({
  name: "BaseMenu",
  setup() {
    const appStore = useAppStore();
    const { menus } = storeToRefs(appStore);
    const renderMenus = unref(menus)[0].children

    const selectedKey = ref<string[]>([])
    const openKeys = ref<string[]>([])
    const { theme } = storeToRefs(appStore)

    const router = useRouter()
    const route = useRoute()

    const go = (item: RouteRecordRow):void => {
      const fullPath = item.fullPath
      if (isUrl(fullPath)) {
        window.location.href = fullPath
        selectedKey.value = item.name
        return
      }
      const { hideInMenu } = item.meta as RouteMeta
      if (route.name === item.name && !hideInMenu) {
        selectedKey.value = item.name
        return
      }
      router.push({ name: item.name })
    }
    const renderSubMenu = () => {
      function travel(_route: RouteRecordRow[], nodes = []) {
        if (_route) {
          _route.forEach(element => {
            const node = element?.children && element.children.length ? (
              <Menu.SubMenu
                key={element.name}
                title={element.meta.title}
              >
                { travel(element.children)}
              </Menu.SubMenu>
            ) : (
              <Menu.Item
                key={element.name}
                onClick={()=>go(element)}
              >
                { element.meta.title }
              </Menu.Item>
            )
            nodes.push(node)
          })
        }
        return nodes
      }
      return travel(renderMenus)
    }
    return () => (
      <Menu theme={'dark'} selectedKey={selectedKey.value}>
        { renderSubMenu() }
      </Menu>
    );
  },
});

export default BaseMenu
