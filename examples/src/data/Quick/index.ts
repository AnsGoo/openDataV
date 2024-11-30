import { defineAsyncComponent, shallowRef } from 'vue'

import handler, { QUICK_TYPE } from './handler'

const Quick = defineAsyncComponent(() => import('./Pane.vue'))

export default {
  type: QUICK_TYPE,
  name: '快速数据',
  component: shallowRef(Quick),
  handler,
  useTo: 'COMPONENT'
}
