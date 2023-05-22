import { shallowRef } from 'vue'

import { DataType } from '@/enum/data'

import Demo from './View.vue'

export default {
  type: DataType.DEMO,
  name: '示例数据',
  component: shallowRef(Demo)
}
