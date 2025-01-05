import { defineAsyncComponent } from 'vue'

import Subontent from './data-view.vue'
import handler from './handler'

const SubPanel = defineAsyncComponent(() => import('./panel.vue'))

export default {
  name: 'SUB',
  title: '订阅数据',
  component: SubPanel,
  handler,
  useTo: ['COMPONENT']
}
export { handler, Subontent, SubPanel }
