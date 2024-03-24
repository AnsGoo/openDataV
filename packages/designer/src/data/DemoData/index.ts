import { shallowRef } from 'vue'

import DemoRequestData from './handler'
import DemoPane from './Pane.vue'

export default {
  type: 'DEMO',
  name: '示例数据',
  component: shallowRef(DemoPane),
  handler: DemoRequestData,
  useTo: 'COMPONENT'
}
