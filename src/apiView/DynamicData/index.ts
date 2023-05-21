import { shallowRef } from 'vue'

import { DataType } from '../const'
import Rest from './View.vue'

export default {
  type: DataType.REST,
  name: '动态数据',
  component: shallowRef(Rest)
}
