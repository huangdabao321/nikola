import { createApp } from 'vue'
import router from './router'
import { createPinia } from 'pinia'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css'
import 'nprogress/nprogress.css'
import './permission'

const pinia = createPinia()
const app = createApp(App)

// 错误上报
app.config.errorHandler = (err, instance, info) => {
  console.log('errorHandler', err, instance, info)
}

app.use(router)
app.use(pinia)
app.mount('#app')
