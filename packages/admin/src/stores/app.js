import { defineStore } from "pinia";
import { reactive } from "vue";
import { store } from '@nikola/utils'

export const app = defineStore('app', ()=>{
  const app = reactive({
    token: store.get('accessToken') || undefined
  })
  function setApp(val) {
    app = { ...val}
  }
  return { app, setApp }
})