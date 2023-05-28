import { shallowRef } from 'vue'

import { DataType } from '../const'
import handler from './handler'
import Static from './View.vue'

export default {
  type: DataType.STATIC,
  name: '快速数据',
  component: shallowRef(Static),
  handler
}
export const useDataPlugin = () => {
  return {
    type: DataType.STATIC,
    name: '静态数据',
    component: shallowRef(Static),
    handler
  }
}
