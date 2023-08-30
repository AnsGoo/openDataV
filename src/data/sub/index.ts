import { shallowRef } from 'vue'

import handler from './handler'
import SubPane from './Pane.vue'
import Subontent from './SubDataView.vue'

export default {
  type: 'SUB',
  name: '订阅数据',
  component: shallowRef(SubPane),
  handler,
  useTo: ['COMPONENT']
}

export { handler, Subontent, SubPane }
