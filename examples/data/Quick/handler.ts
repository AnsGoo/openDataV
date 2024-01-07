import type { DataAcceptor, DataInstance, RequestOptions, Response } from 'open-data-v/data'

import { getStaticDataApi } from '@/api/data'

import type { StoreStaticOption } from './type'

const QUICK_TYPE = 'QUICK'

export interface QuickDataResponse extends Response {
  id: string
  title: string
}
class QuickRequestData implements DataInstance {
  public id?: string
  public title?: string

  constructor(options: { id: string | undefined }) {
    const { id } = options || {}
    this.id = id
  }

  public toJSON(): RequestOptions<StoreStaticOption> {
    return {
      options: {
        id: this.id || '',
        title: this.title
      },
      type: 'STATIC'
    }
  }
  public static dumps(data: string, isFormat = false): string | undefined {
    return isFormat ? JSON.stringify(data, null, '\t') : JSON.stringify(data)
  }
  public static loads(data: string): any | undefined {
    return JSON.parse(data)
  }

  public async connect(acceptor: DataAcceptor, options?: Record<string, any>) {
    const resp = await this.getRespData(options)
    acceptor(resp)
  }
  public async getRespData(_options?: Record<string, any>): Promise<Response> {
    const response: QuickDataResponse = {
      status: 'SUCCESS',
      data: '',
      id: '',
      title: ''
    }
    if (!this.id) {
      return response
    }
    try {
      const resp = await getStaticDataApi(this.id!)
      if (resp.status < 400) {
        const data = resp.data
        this.title = data.name
        response.data = data.data
      }
    } catch (err: any) {
      response.status = 'FAILED'
      response.data = err.stack || err.message
    }
    response.id = this.id
    response.title = this.title || ''
    return response
  }

  public async debug(config: { id: string }, acceptor: DataAcceptor) {
    const { id } = config
    this.id = id
    this.connect(acceptor, config)
  }

  public close() {}
}

export { QUICK_TYPE }
export default QuickRequestData
