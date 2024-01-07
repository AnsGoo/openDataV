import { cloneDeep } from 'lodash-es'

import type { RequestInstance } from '../hooks'
import { useRequest } from '../hooks'
import type { DataAcceptor, DataInstance, Response } from '../type'
import type { StoreRestOption } from './type'

class RestRequestData implements DataInstance {
  public options?: StoreRestOption
  public requestInstance: RequestInstance
  public timer: IntervalHandle = 0

  constructor(options?: StoreRestOption, connector?: RequestInstance) {
    this.options = options
    this.requestInstance = connector || useRequest()
  }
  public close() {
    clearInterval(this.timer)
  }

  public async connect(acceptor: DataAcceptor) {
    const { otherConfig = { isRepeat: false, interval: 3000 } } = this.options || {}
    if (otherConfig.isRepeat) {
      const handler = async () => {
        const resp = await this.getRespData()
        acceptor(resp)
      }
      const interval = otherConfig.interval | 3000
      this.timer = setInterval(handler, interval)
    } else {
      const resp = await this.getRespData()
      acceptor(resp)
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

  public async debug(config: StoreRestOption, acceptor: DataAcceptor) {
    this.options = JSON.parse(JSON.stringify(config)) as StoreRestOption
    this.options.otherConfig.isRepeat = false
    this.connect(acceptor)
  }

  public toJSON() {
    return {
      options: cloneDeep(this.options),
      type: 'REST'
    }
  }
}

export default RestRequestData
