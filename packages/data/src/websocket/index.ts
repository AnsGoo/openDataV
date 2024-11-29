import { defineAsyncComponent, shallowRef } from 'vue'

import handler from './handler'
import type { WebsocketOption } from './type'
import WebSocketContent from './WebsocketView.vue'

const WebSocketPane = defineAsyncComponent(() => import('./Pane.vue'))

export default {
  type: 'WS',
  name: 'WS数据',
  component: shallowRef(WebSocketPane),
  handler,
  useTo: ['COMPONENT', 'GLOBAL'] as Array<'COMPONENT' | 'GLOBAL'>,
  getDefaultOption: () => {
    return {
      url: '',
      message: '',
      timeout: 3000,
      isRetry: false,
      maxRetryCount: 0
    }
  }
}

export { handler, WebSocketContent, WebSocketPane }

export type { WebsocketOption }
