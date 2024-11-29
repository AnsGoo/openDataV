import { defineAsyncComponent, shallowRef } from 'vue'

import handler, { QUICK_TYPE } from './handler'

export default {
  type: QUICK_TYPE,
  name: '快速数据',
  component: shallowRef(defineAsyncComponent(() => import('./Pane.vue'))),
  handler,
  useTo: 'COMPONENT'
}
