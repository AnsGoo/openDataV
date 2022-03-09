import { createApp } from 'vue'
import App from './App.vue'
import '@/css/tailwind.css'
import '@/css/index.less'
import '@/css/font.less'
import '@/assets/directionFonts/iconfont.css'
import 'element-plus/dist/index.css'
import * as Icons from '@element-plus/icons-vue'
import { setupStore } from '@/store'
import { setupCustomComponent } from '@/designer/load'
import { setupRouter } from '@/router'
import Directive from '@/plugins/directive'

const app = createApp(App)
app.use(Directive)

// 注册状态管理器
setupStore(app)

// 注册路由模块
setupRouter(app)

// 注册自定义全局组件
setupCustomComponent(app)
// app.use(ElementPlus)
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key as keyof typeof Icons])
})
app.mount('#app', true)
