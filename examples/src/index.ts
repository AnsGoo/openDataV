import '@/css/tailwind.css'
import '@/css/index.less'
import '@/css/font.less'
import '@/assets/directionFonts/iconfont.css'

// import '@open-data-v/ui/style'
// import '@open-data-v/designer/style'
// import '@open-data-v/data/style'
// import '@open-data-v/scripts/style'
import { Directive, useGraphState } from '@open-data-v/designer'
import bootstrap from '@open-data-v/designer'
import { createApp } from 'vue'

import router from '@/router'
import store from '@/store'

import App from './App.vue'
import CodeEditor from './components/CodeEditor'
import { useAsyncLoadComponent } from './load'

const app = createApp(App)
const graphState = useGraphState()
const dataV = bootstrap({ codeEditorComponent: CodeEditor })
const remoteComponents = useAsyncLoadComponent(graphState)
app.use(router)
app.use(Directive)
app.use(remoteComponents)
app.use(dataV)

// 注册状态管理器
app.use(store)

// 注册路由模块

app.mount('#app', true)
