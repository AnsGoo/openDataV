import { defineAsyncComponent, shallowRef } from 'vue'

import ScriptHandler from './handler'
import { makeFunction } from './utils'

const View = defineAsyncComponent(() => import('./View.vue'))

export default {
  type: 'Custom',
  name: '自定义脚本',
  component: shallowRef(View),
  handler: ScriptHandler
}

export { makeFunction }
