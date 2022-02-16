import { createApp } from 'vue'
import App from './App.vue'
import '@/css/tailwind.css'
import '@/css/index.less'
import '@/css/font.less'
import '@/assets/directionFonts/iconfont.css'
import 'element-plus/dist/index.css'
import { setupStore } from '@/store'
import { setupCustomComponent } from '@/views/index'
import { setupRouter } from '@/router'

const app = createApp(App)

// 注册状态管理器
setupStore(app)

// 注册路由模块
setupRouter(app)

// 注册自定义全局组件
setupCustomComponent(app)
// app.use(ElementPlus)
app.mount('#app', true)
