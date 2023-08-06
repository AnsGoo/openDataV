import { shallowRef } from 'vue'

import handler from './handler'
import WebSocketPane from './Pane.vue'
import type { WebsocketOption } from './type'
import WebSocketContent from './WebsocketView.vue'

export default {
  type: 'WS',
  name: 'WS数据',
  component: shallowRef(WebSocketPane),
  handler,
  useTo: ['COMPONENT', 'GLOBAL'] as Array<'COMPONENT' | 'GLOBAL'>,
  getdefaultOption: () => {
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
