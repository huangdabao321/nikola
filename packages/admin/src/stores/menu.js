import { defineStore } from "pinia";

export const useMenuStore = defineStore('menu', {
  state: () => {
    return {
      menus: []
    }
  },
  actions: {
    setMenu(val) {
      this.menus = val
    }
  }
})
