import { defineStore } from "pinia";
import { reactive } from "vue";

export const useMenuStore = defineStore('menu', () => {
  const menu = reactive([])
  function setMenu(val) {
    menu = [...val]
  }
  return { menu, setMenu  }
})
