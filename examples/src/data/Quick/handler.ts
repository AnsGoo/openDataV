import type { Response } from '@open-data-v/base'
import { uuid } from '@open-data-v/base'

import { getStaticDataApi } from '@/api/data'
import { handler as StaticDataHandler } from '@/open-data-v/data'

const QUICK_TYPE = 'QUICK'

export interface QuickDataResponse extends Response {
  id: string
  title: string
}
class QuickDataHanlder extends StaticDataHandler {
  public type = QUICK_TYPE
  public options: {
    dataId: string | undefined
    title: string
    data?: any
  }

  constructor({
    options,
    id
  }: {
    options: { dataId?: string; title?: string; data?: any }
    id?: string
  }) {
    this.options = options || { dataId: '', title: '', data: {} }
    this.id = id || uuid()
  }

  public toJSON() {
    return {
      options: {
        id: this.id || '',
        title: this.title
      },
      type: this.type,
      id: this.id
    }
  }

  public async getRespData(): Promise<Response> {
    const response: QuickDataResponse = {
      status: 'SUCCESS',
      data: '',
      id: '',
      title: ''
    }
    if (!this.options.dataId) {
      return response
    }
    try {
      const resp = await getStaticDataApi(this.options.dataId!)
      if (resp.status < 400) {
        const data = resp.data
        this.options.data = data.data
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
}

export { QUICK_TYPE }

export default QuickDataHanlder
