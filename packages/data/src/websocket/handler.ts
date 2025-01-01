import type { DataAcceptor, DataInstance, Response } from '@open-data-v/base'
import { uuid } from '@open-data-v/base'
import { cloneDeep } from 'lodash-es'

import type { WebSocketInstance } from '../hooks'
import { useWebsocket } from '../hooks'
import { dataLogger } from '../utils'
import type { WebsocketOption } from './type'

class WebsocketData implements DataInstance {
  public options?: WebsocketOption
  public wsInstance?: WebSocket
  public timer: IntervalHandle = 0
  public acceptor?: DataAcceptor
  private retryCount = 0
  private connector: WebSocketInstance
  private debugAcceptor?: DataAcceptor
  public id: string
  type = 'WS'

  constructor(options?: WebsocketOption, connector?: WebSocketInstance, id?: string) {
    this.options = options
    this.connector = connector || useWebsocket()
    this.id = id || uuid()
  }
  public close() {
    this.wsInstance?.close()
    clearInterval(this.timer)
  }

  private ping() {
    const timeout = this.options?.timeout || 3000
    const handler = () => {
      this.wsInstance?.send?.('ping')
    }
    this.timer = setInterval(handler, timeout)
  }

  public send(message: string) {
    this.wsInstance?.send(message)
  }
  public async connect(acceptor: DataAcceptor) {
    this.acceptor = acceptor
    await this._connect()
  }

  private async _connect() {
    await this.wsconnect()
  }

  public async updateOption({ options }: { options?: StoreRestOption }) {
    this.options = options
    this.close()
    this.accessor && this._connect(this.accessor)
  }

  private async wsconnect() {
    if (!this.options) {
      return
    }
    this.wsInstance = new this.connector(this.options.url)
    this.wsInstance.addEventListener('open', () => {
      dataLogger.info('wsOpen')
    })
    const handlerData = (message) => {
      const response: Response = {
        status: 'FAILED',
        data: ''
      }
      try {
        const data = JSON.parse(message.data)
        response.data = data
        response.status = 'SUCCESS'
      } catch (err: any) {
        response.data = err.message ? err.message : err
      }

      if (this.acceptor) {
        this.acceptor(response)
      }
      if (this.debugAcceptor) {
        this.debugAcceptor(response)
      }
    }
    this.wsInstance.addEventListener('message', handlerData)
    this.wsInstance.addEventListener('error', (_err) => {
      dataLogger.error('ws.ts Error')
      if (!this.options!.isRetry) {
        return
      }
      if (this.options!.maxRetryCount < 0 || this.retryCount < this.options!.maxRetryCount) {
        this.reConnect()
      }
    })
    this.ping()
  }

  public reConnect() {
    this.close()
    this.wsconnect()
    this.retryCount++
  }

  public async debug(acceptor: DataAcceptor) {
    this.debugAcceptor = acceptor
    this.reConnect()
  }

  public cancelDebug() {
    this.debugAcceptor = undefined
  }

  public toJSON() {
    return {
      options: cloneDeep(this.options),
      type: this.type,
      id: this.id
    }
  }
}

export default WebsocketData
