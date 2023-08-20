import { shallowRef } from 'vue'

import DemoRequestData from './handler'
import Demo from './View.vue'

export default {
  type: 'DEMO',
  name: '示例数据',
  component: shallowRef(Demo),
  handler: DemoRequestData,
  useTo: 'COMPONENT'
}
