import {
  defineComponent,
  reactive,
  watchEffect,
} from "vue";
import { Tabs, Menu, Dropdown } from "ant-design-vue";
import { useRouter } from "vue-router";
import "./multitab.less";

const { TabPane } = Tabs;
const { Item } = Menu;

export default defineComponent({
  name: "MultiTab",
  setup() {
    const state = reactive({
      fullPathList: [],
      pages: [],
      activeKey: "",
      newTabIndex: 0,
    });

    const remove = (targetKey) => {
      if (state.fullPathList.length > 1) {
        state.fullPathList = state.fullPathList.filter((path) => path !== targetKey);
        const pages = state.pages.filter((route) => route.path !== targetKey)
      
        console.log('======>', state.fullPathList, pages)
      }
    };

    // 切换tab
    function tabChange(key) {
      router.push(key);
    }
    // 关闭tab pane
    const onEdit = (targetKey, action) => {
      console.log(targetKey, action);
      remove(targetKey);
    };

    const selectedLastPath = () => {};
    // 关闭当前
    const closeThat = (path) => {
      console.log("xxx");
    };

    const closeLeft = (path) => {};

    const closeRight = (path) => {};

    const closeAll = () => {};

    const actionMap = {
      closeThat,
      closeLeft,
      closeRight,
      closeAll,
    };

    const closeMenuClick = (fullPath, action) => {
      // 右键菜单对应的操作
      console.log("菜单操作", fullPath, action);
      actionMap[action](fullPath);
    };

    const router = useRouter();
    watchEffect(() => {
      const route = router.currentRoute.value;
      const { fullPath } = route;
      state.activeKey = fullPath;
      console.log('watchEffect', fullPath, state.fullPathList.includes(fullPath), state.fullPathList)
      if (!state.fullPathList.includes(fullPath)) {
        state.fullPathList.push(fullPath);
        state.pages.push(route);
        console.log(state.pages);
      }
    });

    const renderTabPaneMenu = (fullPath) => {
      return (
        <Menu onClick={({ key }) => closeMenuClick(fullPath, key)}>
          <Item key="closeThat">关闭当前标签</Item>
          <Item key="closeRight">关闭右侧</Item>
          <Item key="closeLeft">关闭左侧</Item>
          <Item key="closeAll">关闭全部</Item>
        </Menu>
      );
    };

    const renderTabPane = (title, fullPath) => {
      const menus = renderTabPaneMenu(fullPath);
      return (
        <Dropdown overlay={menus} trigger={["contextmenu"]}>
          <span>{title}</span>
        </Dropdown>
      );
    };

    return () => {
      console.log("asdg", state.pages);
      return (
        <div className="multi-tab">
          <div className="multi-tab-wrap">
            <Tabs
              hideAdd
              type="editable-card"
              animated={false}
              v-model={[state.activeKey, "activeKey"]}
              onChange={(key) => tabChange(key)}
              onEdit={(targetKey, action) => onEdit(targetKey, action)}
              tabBarStyle={{
                background: "#FFF",
                margin: 0,
                paddingLeft: "16px",
                paddingTop: "1px",
              }}
            >
              {state.pages.map((page) => {
                return (
                  <TabPane
                    tab={renderTabPane(page.meta.title, page.fullPath)}
                    key={page.fullPath}
                  ></TabPane>
                );
              })}
            </Tabs>
          </div>
        </div>
      );
    };
  },
});
