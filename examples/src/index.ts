import '@/css/tailwind.css'
import '@/css/index.less'
import '@/css/font.less'
import '@/assets/directionFonts/iconfont.css'
// import '@open-data-v/ui/style'
// import '@open-data-v/designer/style'
// import '@open-data-v/data/style'
// import '@open-data-v/scripts/style'

import { Directive, useComponentPlugin } from '@open-data-v/designer'
import { createApp } from 'vue'

import router from '@/router'
import store from '@/store'

import App from './App.vue'
import CodeEditor from './components/CodeEditor'
import { useAsyncLoadComponent } from './load'

const componentPlugin = useComponentPlugin({ codeEditorComponent: CodeEditor })

const RemoteComponent = useAsyncLoadComponent()

const app = createApp(App)
app.use(router)
app.use(Directive)

// 注册状态管理器
app.use(store)
app.use(componentPlugin)
app.use(RemoteComponent)

// 注册路由模块

app.mount('#app', true)
