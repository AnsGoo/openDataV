import type { DataAcceptor, DataInstance, Response } from '@open-data-v/base'
import { uuid } from '@open-data-v/base'
import { cloneDeep } from 'lodash-es'

import type { RequestInstance } from '../hooks'
import { useRequest } from '../hooks'
import type { StoreRestOption } from './type'

class RestRequestData implements DataInstance {
  public options?: StoreRestOption
  public requestInstance: RequestInstance
  public timer: any = 0
  public type = 'REST'
  public accessor: DataAcceptor | undefined
  private debugAcceptor: DataAcceptor | undefined

  constructor({
    options,
    connector,
    id
  }: {
    options?: StoreRestOption
    connector?: RequestInstance
    id?: string
  }) {
    this.options = options
    this.requestInstance = connector || useRequest()
    this.id = id || uuid()
  }
  id: string
  public close() {
    clearInterval(this.timer)
  }

  public async connect(acceptor: DataAcceptor) {
    this.accessor = acceptor
    this._connect()
  }
  private async _connect() {
    this.close()
    const { otherConfig = { isRepeat: false, interval: 3000 } } = this.options || {}
    if (otherConfig.isRepeat) {
      const handler = async () => {
        const resp = await this.getRespData()
        this.acceptor?.(resp)
        this.debugAcceptor?.(resp.data)
      }
      const interval = otherConfig.interval | 3000
      this.timer = setInterval(handler, interval) as unknown as IntervalHandle
    } else {
      const resp = await this.getRespData()
      this.acceptor?.(resp)
      this.debugAcceptor?.(resp.data)
    }
  }

  public async getRespData(): Promise<Response> {
    const response: Response = {
      status: 'FAILED',
      data: ''
    }
    if (!this.options) {
      return response
    }

    try {
      const config = {
        url: this.options.url,
        method: this.options.method,
        headers: this.options.headers,
        params: this.options.params,
        data: this.options.data
      }
      const resp = await this.requestInstance.request(config)
      response.status = 'SUCCESS'
      response.data = resp.data
    } catch (err: any) {
      err.response || (err.toJSON ? err.toJSON() : {})
      response.status = 'FAILED'
      response.data = err.stack || err.message
    }
    return response
  }

  public async debug(acceptor: DataAcceptor) {
    this.debugAcceptor = acceptor
    this._connect()
  }
  public updateOption(options: { options?: StoreRestOption }) {
    this.options = {
      ...this.options,
      ...options
    }
    this._connect()
  }

  public toJSON() {
    return {
      options: cloneDeep(this.options),
      type: this.type,
      id: this.id
    }
  }
}

export default RestRequestData
