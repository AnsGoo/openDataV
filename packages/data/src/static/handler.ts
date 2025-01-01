import type { DataAcceptor, DataInstance, Response } from '@open-data-v/base'
import { uuid } from '@open-data-v/base'

class StaticRequestData implements DataInstance {
  public data?: any
  id: string
  type = 'STATIC'

  accessor: DataAcceptor | undefined
  constructor(options?: { data?: string; id?: string }) {
    const { data } = options || {}
    this.data = data || ''
    this.id = options?.id || uuid()
  }

  public toJSON() {
    return {
      options: {
        data: this.data
      },
      type: 'STATIC',
      id: this.id
    }
  }

  public updateOption(options: { data?: string }) {
    this.data = options?.data || ''
    this.close()
    this.accessor && this.connect(this.accessor)
  }
  public async connect(acceptor: DataAcceptor) {
    const resp = await this.getRespData()
    this.accessor = acceptor
    acceptor(resp)
  }

  public async getRespData(): Promise<Response> {
    const response: Response = {
      status: 'SUCCESS',
      data: ''
    }
    try {
      response.data = JSON.parse(this.data)
      response.status = 'SUCCESS'
    } catch (err: any) {
      response.status = 'FAILED'
      return response
    }

    return response
  }

  public async debug(acceptor: DataAcceptor) {
    const resp = await this.getRespData()
    acceptor(resp)
    this.accessor && this.accessor(resp)
  }

  public close() {}
}
export default StaticRequestData
