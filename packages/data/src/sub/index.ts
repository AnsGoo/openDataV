import { defineAsyncComponent, shallowRef } from 'vue'

import handler from './handler'

const Subontent = defineAsyncComponent(() => import('./SubDataView.vue'))
const SubPane = defineAsyncComponent(() => import('./Pane.vue'))

export default {
  type: 'SUB',
  name: '订阅数据',
  component: shallowRef(SubPane),
  handler,
  useTo: ['COMPONENT']
}

export { handler, Subontent, SubPane }
