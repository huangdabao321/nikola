import { defineComponent, ref } from "vue";
import { Menu } from "ant-design-vue";
import { useAppStore } from "@/store";
import { storeToRefs } from "pinia";
import type { RouteRecordRaw, RouteMeta } from "vue-router";
import { useRouter, useRoute } from "vue-router";
import { isUrl } from '@nikola/utils/is'
import { SettingFilled, SettingOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  name: "BaseMenu",
  setup(props) {
    const appStore = useAppStore();
    const { menus } = storeToRefs(appStore);
    const selectedKey = ref<string[]>([])
    const openKeys = ref<string[]>([])

    const handleMenuClick = (item: RouteRecordRaw) => {
      go(item)
    }
    const handleTitleClick = (item: RouteRecordRaw) => {
      console.log('title click',  selectedKey.value, openKeys.value)
    }

    const router = useRouter()
    const route = useRoute()

    const go = (item: RouteRecordRaw):void => {
      const fullPath = item.path
      const target = item?.meta?.target as string
      if (target && isUrl(target)) {
        window.location.href = target
        selectedKey.value = [item.name as string]
        return
      }
      const { hideInMenu } = item.meta as RouteMeta
      if (route.name === item.name && !hideInMenu) {
        return
      }
      router.push({ name: item.name })
    }
    const renderMenuItem = (item: RouteRecordRaw) => {
      // todo icon问题
      return <Menu.Item 
                key={item.name} 
                onClick={() => handleMenuClick(item)}
                v-slots={{
                  icon: () => <SettingOutlined/>
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
                    onTitleClick={() => handleTitleClick(element)}
                    v-slots={{icon: () => <SettingOutlined/>, title: () => element?.meta?.title }}
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
        v-model:selectedKey={selectedKey.value}
        v-model:openKeys={openKeys.value}
      >
        { renderSubMenu(menus.value) }
      </Menu>
    );
  },
});
