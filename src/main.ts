import '@/css/tailwind.css'
import '@/css/index.less'
import '@/css/font.less'
import '@/assets/directionFonts/iconfont.css'

import { createApp } from 'vue'

import { AsyncComponent } from '@/designer/load'
import Directive from '@/plugins/directive'
import XIcon from '@/plugins/xicon'
import router from '@/router'
import store from '@/store'

import App from './App.vue'

const app = createApp(App)
app.use(router)
app.use(Directive)
app.use(XIcon)
app.use(AsyncComponent)

// 注册状态管理器
app.use(store)

// 注册路由模块

app.mount('#app', true)
