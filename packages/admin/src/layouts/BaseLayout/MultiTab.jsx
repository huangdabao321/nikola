import { watch } from "less";
import { defineComponent, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import "./multitab.less";

export default defineComponent({
  name: "MultiTab",
  setup(props, { emit }) {
    const fullPathList = reactive([]);
    const pages = reactive([]);
    const activeKey = ref("");
    const newTabIndex = ref(0);

    const onEdit = (targetKey, action) => {};

    const remove = (targetKey) => {};

    const selectedLastPath = () => {};

    const closeThat = () => {};

    const closeLeft = (e) => {};

    const closeRight = (e) => {};

    const closeAll = (e) => {};

    const closeMenuClick = (key, route) => {
      key(route);
    };

    const renderTabPaneMenu = (e) => {
      return (
        <a-menu
          {...{
            on: { click: ({ key, item, domEvent }) => closeMenuClick(key, e) },
          }}
        >
          <a-menu-item key="closeThat">关闭当前标签</a-menu-item>
          <a-menu-item key="closeRight">关闭右侧</a-menu-item>
          <a-menu-item key="closeLeft">关闭左侧</a-menu-item>
          <a-menu-item key="closeAll">关闭全部</a-menu-item>
        </a-menu>
      );
    };

    const renderTabPane = (title, keyPath) => {
      const menus = renderTabPaneMenu(keyPath);
      return (
        <a-dropdown overlay={menus} trigger={["contextmenu"]}>
          <span>{title}</span>
        </a-dropdown>
      );
    };

    const router = useRouter();
    watch(router, (newVal, oldVal) => {
      // 监听route
    });

    watch(activeKey, (newVal, olbVal) => {
      // 监听activeKey
    });
  },
  render() {
    return (
      <div className="multi-tab">
        <div className="multi-tab-wrap">
          <a-tabs
            hideAdd
            type="editable-card"
            v-model={activeKey}
            tabBarStyle={{
              background: "#FFF",
              margin: 0,
              paddingLeft: "16px",
              paddingTop: "1px",
            }}
          >
            asdgf
            {pages.map((page) => {
              return (
                <a-tab-pane
                  tab={renderTabPane(page.meta.title, page.fullPath)}
                  key={page.fullPath}
                ></a-tab-pane>
              );
            })}
          </a-tabs>
        </div>
      </div>
    );
  },
});
