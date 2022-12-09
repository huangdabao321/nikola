import { defineComponent, inject, ref } from "vue";
import { Menu } from "ant-design-vue";
import { useAppStore } from "@/store";
import { storeToRefs } from "pinia";
import type { RouteRecordRaw, RouteMeta } from "vue-router";
import { useRouter, useRoute } from "vue-router";
import { isUrl } from '@nikola/utils/is'
import { collapsedKey } from '@/layouts/BaseLayout/keys'

export default defineComponent({
  name: "BaseMenu",
  setup(props) {
    const appStore = useAppStore();
    const { menus } = storeToRefs(appStore);
    const selectedKey = ref<string[]>([])
    const openKeys = ref<string[]>([])

    const handleMenuClick = (item: RouteRecordRaw) => {
      console.log('menu click',  selectedKey.value, openKeys.value)
      selectedKey.value = [item.name as string]
    }
    const handleTitleClick = (item: RouteRecordRaw) => {
      // openKeys.value = [item.name as string]
      console.log('title click',  selectedKey.value, openKeys.value)

    }

    const collapsed = inject(collapsedKey)

    const router = useRouter()
    const route = useRoute()

    const go = (item: RouteRecordRaw):void => {
      const fullPath = item.path
      const target = item?.meta?.target as string
      console.log(isUrl(fullPath))
      if (target && isUrl(target)) {
        window.location.href = target
        selectedKey.value = [item.name as string]
        return
      }
      const { hideInMenu } = item.meta as RouteMeta
      if (route.name === item.name && !hideInMenu) {
        selectedKey.value = [item.name as string]
        return
      }
      router.push({ name: item.name })
    }
    const renderMenuItem = (item: RouteRecordRaw) => {
      return <Menu.Item key={item.name} title={item?.meta?.title as string} onClick={() => handleMenuClick(item)}>{ item?.meta?.title as string }</Menu.Item>
    }

    const renderSubMenu = (records: RouteRecordRaw[], nodes = []) => {
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
          node = <Menu.SubMenu key={element.name} title={element?.meta?.title} onTitleClick={() => handleTitleClick(element)}>{renderSubMenu(children)}</Menu.SubMenu>
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
        v-model:selectedKey={selectedKey.value}
        v-model:openKeys={openKeys.value}
      >
        { renderSubMenu(menus.value) }
      </Menu>
    );
  },
});
