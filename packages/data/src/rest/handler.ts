import type { Response } from '@open-data-v/base'

import { BaseDataHandler } from '../base/handler'
import type { RequestInstance } from '../hooks'
import { useRequest } from '../hooks'
import type { StoreRestOption } from './type'

class RestRequestData extends BaseDataHandler<StoreRestOption> {
  public requestInstance: RequestInstance
  public timer: any = 0

  constructor({
    options,
    connector,
    id
  }: {
    options?: StoreRestOption
    connector?: RequestInstance
    id?: string
  }) {
    super({ options, id })
    this.requestInstance = connector || useRequest()
  }
  public close() {
    clearInterval(this.timer)
  }

  public get type(): string {
    return 'REST'
  }

  public async reconnect() {
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

  private async getRespData(): Promise<Response> {
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
}

export default RestRequestData
