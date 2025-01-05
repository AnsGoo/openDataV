import { defineAsyncComponent } from 'vue'

import handler from './handler'

const StaticContent = defineAsyncComponent(() => import('./data-view.vue'))
const StaticPanel = defineAsyncComponent(() => import('./panel.vue'))
export default {
  name: 'STATIC',
  title: '静态数据',
  component: StaticPanel,
  handler,
  useTo: 'COMPONENT'
}

export { handler, StaticContent, StaticPanel }
