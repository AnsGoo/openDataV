import { shallowRef } from 'vue'

import { DataType } from '../const'
import handler from './handler'
import WebSocket from './View.vue'

export default {
  type: DataType.WS,
  name: 'WS数据',
  component: shallowRef(WebSocket),
  handler
}
