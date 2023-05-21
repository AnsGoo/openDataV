import '@/css/tailwind.css'
import '@/css/index.less'
import '@/css/font.less'
import '@/assets/directionFonts/iconfont.css'

import { createApp } from 'vue'

import { AsyncComponent } from '@/designer/load'
import useComponetPlugin from '@/designer/loadPlugin'
import Directive from '@/plugins/directive'
import router from '@/router'
import store from '@/store'

import App from './App.vue'
import CodeEditor from './components/CodeEditor'

const componetPlugin = useComponetPlugin({ codeEditorComponet: CodeEditor })

const app = createApp(App)
app.use(router)
app.use(Directive)
app.use(AsyncComponent)

// 注册状态管理器
app.use(store)
app.use(componetPlugin)

// 注册路由模块

app.mount('#app', true)
