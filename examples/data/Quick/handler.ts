import type { DataAcceptor, DataInstance, RequestOptions, Response } from 'open-data-v/data/type'

import type { StaticDataDetail } from '@/api/data'
import { getStaticDataApi } from '@/api/data'

import type { StoreStaticOption } from './type'

const QUICK_TYPE = 'QUICK'
class QuickRequestData implements DataInstance {
  public id?: string
  public title?: string

  constructor({ id }: { id: string | undefined }) {
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
    const response: Response = {
      status: 'SUCCESS',
      data: ''
    }
    if (!this.id) {
      return response
    }
    try {
      const resp = await getStaticDataApi(this.id!)
      if (resp.status < 400) {
        const data: StaticDataDetail = resp.data
        this.title = data.name
        response.data = data.data
      }
    } catch (err: any) {
      response.status = 'FAILED'
      response.data = err.stack || err.message
    }
    return response
  }
}

export { QUICK_TYPE }
export default QuickRequestData
