import { defineAsyncComponent, shallowRef } from 'vue'

import handler from './handler'
import type { WebsocketOption } from './type'
import WebSocketContent from './ws-view.vue'

const WebSocketPanel = defineAsyncComponent(() => import('./panel.vue'))

export default {
  type: 'WS',
  name: 'WS数据',
  component: shallowRef(WebSocketPanel),
  handler,
  useTo: ['COMPONENT', 'GLOBAL'] as Array<'COMPONENT' | 'GLOBAL'>
}

export { handler, WebSocketContent, WebSocketPanel }

export type { WebsocketOption }
