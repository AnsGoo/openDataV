import { defineAsyncComponent, shallowRef } from 'vue'

import handler from './handler'

const StaticContent = defineAsyncComponent(() => import('./data-view.vue'))
const StaticPane = defineAsyncComponent(() => import('./panel.vue'))
export default {
  type: 'STATIC',
  name: '静态数据',
  component: shallowRef(StaticPane),
  handler,
  useTo: 'COMPONENT'
}

export { handler, StaticContent, StaticPane }
