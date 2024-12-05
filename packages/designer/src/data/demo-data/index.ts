import { defineAsyncComponent, shallowRef } from 'vue'

import DemoRequestData from './handler'

export default {
  type: 'DEMO',
  name: '示例数据',
  component: shallowRef(defineAsyncComponent(() => import('./panel.vue'))),
  handler: DemoRequestData,
  useTo: 'COMPONENT'
}
