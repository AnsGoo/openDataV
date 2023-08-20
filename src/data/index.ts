import type { RestResponse } from './rest'
import RestDataPlugin from './rest'
import StaticDataPlugin from './static'
import SubDataPlugin from './sub'
import type { DataAcceptor, DataInstance, RequestOptions, Response, Slotter } from './type'
import WebsocketDataPlugin from './websocket'

export type { DataAcceptor, DataInstance, RequestOptions, Response, RestResponse, Slotter }
export { RestDataPlugin, StaticDataPlugin, SubDataPlugin, WebsocketDataPlugin }