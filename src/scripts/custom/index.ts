import { shallowRef } from 'vue'

import ScriptHandler from './handler'
import View from './View.vue'

export default {
  type: 'Custom',
  name: '自定义脚本',
  component: shallowRef(View),
  handler: ScriptHandler
}
