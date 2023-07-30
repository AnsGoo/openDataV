import '@/css/tailwind.css'
import '@/css/index.less'
import '@/css/font.less'
import '@/assets/directionFonts/iconfont.css'

import { useLoadComponent } from 'open-data-v/designer/load'
import useComponetPlugin from 'open-data-v/designer/loadPlugin'
import Directive from 'open-data-v/plugins/directive'
import { createApp } from 'vue'

import router from '@/router'
import store from '@/store'

import App from './App.vue'
import CodeEditor from './components/CodeEditor'

const componetPlugin = useComponetPlugin({ codeEditorComponet: CodeEditor })
const AsyncComponent = useLoadComponent()

const app = createApp(App)
app.use(router)
app.use(Directive)
app.use(AsyncComponent)

// 注册状态管理器
app.use(store)
app.use(componetPlugin)

// 注册路由模块

app.mount('#app', true)
