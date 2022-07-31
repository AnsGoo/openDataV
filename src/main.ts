import { createApp } from 'vue'
import App from './App.vue'
import '@/css/tailwind.css'
import '@/css/index.less'
import '@/css/font.less'
import '@/assets/directionFonts/iconfont.css'
import store from '@/store'
import { AsyncComponent } from '@/designer/load'
import router from '@/router'
import Directive from '@/plugins/directive'
import Icon from '@/plugins/icon'

const app = createApp(App)
app.use(Directive)
app.use(Icon)

app.use(AsyncComponent)

// 注册状态管理器
app.use(store)

// 注册路由模块
app.use(router)

app.mount('#app', true)
