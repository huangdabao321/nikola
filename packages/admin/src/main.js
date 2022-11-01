import { createApp } from 'vue'
import 'ant-design-vue/dist/antd.css'
import router from './router'
import { createPinia } from 'pinia'
import App from './App.vue'
import './permission'

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
app.mount('#app')
