import { shallowRef } from 'vue'

import ScriptHandler from './handler'
import funcs from './scripts'
import View from './View.vue'

export default {
  type: 'System',
  name: '系统脚本',
  component: shallowRef(View),
  funcs: funcs,
  handler: ScriptHandler
}
