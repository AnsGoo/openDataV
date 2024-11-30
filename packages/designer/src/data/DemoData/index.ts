import { defineAsyncComponent, shallowRef } from 'vue'

import DemoRequestData from './handler'

const DemoPane = defineAsyncComponent(() => import('./Pane.vue'))

export default {
  type: 'DEMO',
  name: '示例数据',
  component: shallowRef(DemoPane),
  handler: DemoRequestData,
  useTo: 'COMPONENT'
}
