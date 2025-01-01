import { defineAsyncComponent, shallowRef } from 'vue'

import Subontent from './data-view.vue'
import handler from './handler'

const SubPane = defineAsyncComponent(() => import('./panel.vue'))

export default {
  type: 'SUB',
  name: '订阅数据',
  component: shallowRef(SubPane),
  handler,
  useTo: ['COMPONENT']
}
export { handler, Subontent, SubPane }
