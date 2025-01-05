import { defineAsyncComponent } from 'vue'

import QuickDataHanlder, { QUICK_TYPE } from './handler'

export default {
  name: QUICK_TYPE,
  title: '快速数据',
  component: defineAsyncComponent(() => import('./panel.vue')),
  handler: QuickDataHanlder,
  useTo: 'COMPONENT'
}
