import { defineAsyncComponent, shallowRef } from 'vue'

import ScriptHandler from './handler'
import funcs from './scripts'

const View = defineAsyncComponent(() => import('./View.vue'))

export default {
  type: 'System',
  name: '系统脚本',
  component: shallowRef(View),
  funcs: funcs,
  handler: ScriptHandler
}
