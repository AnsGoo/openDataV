import { defineAsyncComponent } from 'vue'

import DemoRequestData from './handler'

export default {
  name: 'DEMO',
  title: '示例数据',
  component: defineAsyncComponent(() => import('./panel.vue')),
  handler: DemoRequestData,
  useTo: 'COMPONENT'
}
