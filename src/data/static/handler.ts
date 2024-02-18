import type { DataAcceptor, DataInstance, Response } from 'open-data-v/base'

class StaticRequestData implements DataInstance {
  public data?: any

  constructor(options?: { data?: string }) {
    const { data } = options || {}
    this.data = data || ''
  }

  public toJSON() {
    return {
      options: {
        data: this.data
      },
      type: 'STATIC'
    }
  }

  public async connect(acceptor: DataAcceptor) {
    const resp = await this.getRespData()
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
  }

  public close() {}
}
export default StaticRequestData
