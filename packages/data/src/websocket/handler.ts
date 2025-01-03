import type { Response } from '@open-data-v/base'

import { BaseDataHandler } from '../base/handler'
import type { WebSocketInstance } from '../hooks'
import { useWebsocket } from '../hooks'
import { dataLogger } from '../utils'
import type { WebsocketOption } from './type'

class WebsocketDataHander extends BaseDataHandler<WebsocketOption> {
  public options: WebsocketOption = {
    url: '',
    message: '',
    timeout: 0,
    isRetry: false,
    maxRetryCount: 0
  }
  public wsInstance?: WebSocket
  public timer: IntervalHandle = 0
  private retryCount = 0
  private connector: WebSocketInstance

  constructor({
    options,
    id,
    connector
  }: {
    options?: WebsocketOption
    connector?: WebSocketInstance
    id?: string
  }) {
    super({ options, id })
    this.connector = connector || useWebsocket()
  }
  public close() {
    this.wsInstance?.close()
    clearInterval(this.timer)
  }

  public get type(): string {
    return 'WS'
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

  public async reconnect() {
    this.close()
    this.wsconnect()
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

      this.acceptor?.(response)
      this.debugAcceptor?.(response)
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

  private reConnect() {
    this.close()
    this.wsconnect()
    this.retryCount++
  }
}

export default WebsocketDataHander
