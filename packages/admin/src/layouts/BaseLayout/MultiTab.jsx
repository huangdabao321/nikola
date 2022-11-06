import { defineComponent, ref, reactive, watchEffect, watch } from "vue";
import { Tabs, Menu, Dropdown } from "ant-design-vue";
import { useRouter } from "vue-router";
import "./multitab.less";

const { TabPane } = Tabs;
const { Item } = Menu;

export default defineComponent({
  name: "MultiTab",
  setup(props, { expose }) {
    let fullPathList = reactive([]);
    const pages = reactive([]);
    const activeKey = ref("");
    const newTabIndex = ref(0);

    const remove = (targetKey) => {
      fullPathList = fullPathList.filter((key) => key !== targetKey);
    };

    // 切换tab
    function tabChange(key) {
      router.push(key);
    }
    // 关闭tab pane
    const onEdit = (targetKey, action) => {
      remove(targetKey);
    };

    const selectedLastPath = () => {};
    // 关闭当前
    const closeThat = (path) => {
      console.log('xxx')
    };

    const closeLeft = (path) => {};

    const closeRight = (path) => {};

    const closeAll = () => {

    };

    const actionMap = {
      closeThat,
      closeLeft,
      closeRight,
      closeAll
    }

    const closeMenuClick = (fullPath, action) => {
      // 右键菜单对应的操作
      console.log("菜单操作", fullPath, action);
      actionMap[action](fullPath)
    };

    const router = useRouter();
    watchEffect(() => {
      const route = router.currentRoute.value;
      const { fullPath } = route;
      activeKey.value = fullPath;
      if (!fullPathList.includes(fullPath)) {
        fullPathList.push(fullPath);
        pages.push(route);
      }
      console.log(activeKey.value)
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

    return () => (
      <div className="multi-tab">
        <div className="multi-tab-wrap">
          <Tabs
            hideAdd
            type="editable-card"
            animated={false}
            v-model={[activeKey.value, 'activeKey']}
            onChange={(key) => tabChange(key)}
            onEdit={(targetKey, action) => onEdit(targetKey, action)}
            tabBarStyle={{
              background: "#FFF",
              margin: 0,
              paddingLeft: "16px",
              paddingTop: "1px",
            }}
          >
            {pages.map((page) => {
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
  },
});
