import type { DataAcceptor, DataInstance, Response } from '@open-data-v/base'
import { uuid } from '@open-data-v/base'

class StaticRequestData implements DataInstance {
  public data?: any
  id: string
  type = 'STATIC'
  options = {
    data: ''
  }

  accessor: DataAcceptor | undefined
  debugAcceptor: DataAcceptor | undefined
  constructor({ options, id }?: { options: { data?: string }; id?: string }) {
    this.options.data = options || { data: '' }
    this.id = id || uuid()
  }

  public toJSON() {
    return {
      options: {
        data: this.options.data
      },
      type: this.type,
      id: this.id
    }
  }

  public updateOption(options: { data?: any }) {
    this.options = {
      ...this.options,
      ...options
    }
    this.close()
    this._connect()
  }
  public async connect(acceptor: DataAcceptor) {
    this.accessor = acceptor
    this._connect()
  }

  private async _connect() {
    const resp = await this.getRespData()
    this.accessor?.(resp)
    this.debugAcceptor?.(resp.data)
  }

  public async getRespData(): Promise<Response> {
    const response: Response = {
      status: 'SUCCESS',
      data: ''
    }
    try {
      response.data = this.options.data
      response.status = 'SUCCESS'
    } catch (err: any) {
      response.status = 'FAILED'
      return response
    }

    return response
  }

  public async debug(acceptor: DataAcceptor) {
    this.debugAcceptor = acceptor
    this._connect()
  }

  public close() {}
}
export default StaticRequestData
