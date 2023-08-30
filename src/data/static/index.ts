import { shallowRef } from 'vue'

import StaticContent from './DataView.vue'
import handler from './handler'
import StaticPane from './Pane.vue'

export default {
  type: 'STATIC',
  name: '静态数据',
  component: shallowRef(StaticPane),
  handler,
  useTo: 'COMPONENT'
}

export { handler, StaticContent, StaticPane }
