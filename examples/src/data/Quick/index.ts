import { defineAsyncComponent, shallowRef } from 'vue'

import QuickDataHanlder, { QUICK_TYPE } from './handler'

export default {
  type: QUICK_TYPE,
  name: '快速数据',
  component: shallowRef(defineAsyncComponent(() => import('./panel.vue'))),
  handler: QuickDataHanlder,
  useTo: 'COMPONENT'
}
