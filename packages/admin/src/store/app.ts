import { defineStore } from "pinia";

const appStore = defineStore("appStore", {
  state() {
    return {
      isMobile: false,
      theme: "",
    };
  },
  actions: {},
});

export default appStore;
