import { cloneDeep } from 'lodash-es'
import type { WebSocketInstance } from 'open-data-v/data/hooks'
import { useWebsocket } from 'open-data-v/data/hooks'

import type { DataAcceptor, DataInstance, Response } from '../type'
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

  constructor(options?: WebsocketOption, connector?: WebSocketInstance) {
    this.options = options
    this.connector = connector || useWebsocket()
  }
  public close() {
    this.wsInstance?.close()
    clearInterval(this.timer)
  }

  private ping() {
    const timeout = this.options?.timeout || 3000
    const handler = () => {
      this.wsInstance?.send('ping')
    }
    this.timer = setInterval(handler, timeout)
  }

  public send(message: string) {
    this.wsInstance?.send(message)
  }
  public async connect(acceptor: DataAcceptor) {
    this.acceptor = acceptor
    await this.wsconnect()
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
  }

  public cancelDebug() {
    this.debugAcceptor = undefined
  }

  public toJSON() {
    return {
      options: cloneDeep(this.options),
      type: 'WS'
    }
  }
}

export default WebsocketData
