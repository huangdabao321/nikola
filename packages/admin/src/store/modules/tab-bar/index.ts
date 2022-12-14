import { defineStore } from "pinia";
import { TabBarState } from "./types";
import { DEFAULT_ROUTE, DEFAULT_ROUTE_NAME } from "@/router/constants";
import { TagProps } from "./types";
import type { RouteLocationNormalized } from "vue-router";
import { isString } from "@nikola/utils/is";

function formatTag(route: RouteLocationNormalized): TagProps {
  const { name, meta, fullPath, query } = route;
  return {
    title: (meta.title as string) || "",
    name: String(name),
    fullPath,
    query,
    ignoreCache: meta.ignoreCache as boolean,
  };
}

const useTabBar = defineStore("tabBar", {
  state: (): TabBarState => ({
    cacheTabList: new Set([DEFAULT_ROUTE_NAME]),
    tagList: [DEFAULT_ROUTE],
  }),
  getters: {
    getTabList(): TagProps[] {
      return this.tagList;
    },
    getCacheList(): string[] {
      return Array.from(this.cacheTabList);
    },
  },
  actions: {
    updateTabList(route: RouteLocationNormalized) {
      this.tagList.push(formatTag(route));
      if (!route.meta.ignoreCache) {
        this.cacheTabList.add(route.name as string);
      }
    },
    deleteTag(id: number, tag: TagProps) {
      this.tagList.splice(id, 1);
      this.cacheTabList.delete(tag.name);
    },
    addCache(name: string) {
      if (isString(name) && name !== "") {
        this.cacheTabList.add(name);
      }
    },
    deleteCache(tag: TagProps) {
      this.cacheTabList.delete(tag.name);
    },
    freshTabList(tags: TagProps[]) {
      this.tagList = tags;
      this.cacheTabList.clear();
      this.tagList
        .filter((el) => !el.ignoreCache)
        .map((el) => el.name)
        .forEach((x) => this.cacheTabList.add(x));
    },
    restTabList() {
      this.tagList = [DEFAULT_ROUTE];
      this.cacheTabList.clear();
      this.cacheTabList.add(DEFAULT_ROUTE_NAME);
    },
  },
});

export default useTabBar;
