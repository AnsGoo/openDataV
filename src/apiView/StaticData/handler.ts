import type {
  DataAcceptor,
  RequestDataInstance,
  RequestOptions,
  Response
} from '@/models/requestOption'
import type { AfterScript } from '@/types/component'

class StaticRequestData implements RequestDataInstance {
  public data?: any

  constructor({ data }: { data: string }) {
    this.data = data
  }

  public toJSON(): RequestOptions<{ data: string; script?: AfterScript }> {
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
}
export default StaticRequestData
