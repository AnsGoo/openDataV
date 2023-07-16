import { cloneDeep } from 'lodash-es'

import { Logger } from '@/apiView/utils'
import type { DataAcceptor, DataInstance, Response } from '@/models/requestOption'
import type { CallbackType } from '@/utils/data'

import type { WebsocketOption } from '../type'

class WebsocketData implements DataInstance {
  public options: WebsocketOption
  public wsInstance?: WebSocket
  public callback?: CallbackType
  public timer: IntervalHandle = 0
  public acceptor?: DataAcceptor
  private retryCount = 0

  constructor(options: WebsocketOption) {
    this.options = options
  }
  public close() {
    this.wsInstance?.close()
    clearInterval(this.timer)
  }

  private ping() {
    const timeout = this.options.timeout || 3000
    const handler = () => {
      this.wsInstance?.send('ping')
    }
    this.timer = setInterval(handler, timeout)
  }

  public async connect(acceptor: DataAcceptor) {
    this.acceptor = acceptor
    await this.wsconnect()
  }

  private async wsconnect() {
    this.wsInstance = new WebSocket(this.options.url)
    this.wsInstance.addEventListener('open', () => {
      Logger.info('wsOpen')
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
    }
    this.wsInstance.addEventListener('message', handlerData)
    this.wsInstance.addEventListener('error', (err) => {
      Logger.error(err)
      if (!this.options.isRetry) {
        return
      }
      if (this.options.maxRetryCount < 0 || this.retryCount < this.options.maxRetryCount) {
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

  public toJSON() {
    return {
      options: cloneDeep(this.options),
      type: 'WS'
    }
  }
}

export default WebsocketData
