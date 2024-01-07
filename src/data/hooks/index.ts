import type { RequestInstance } from './http'
import { useRequest } from './http'
import type { WebSocketInstance } from './ws'
import { useWebsocket } from './ws'

export { useRequest, useWebsocket }

export type { RequestInstance, WebSocketInstance }
