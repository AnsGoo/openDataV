import type { Response } from '@open-data-v/base'
import { uuid } from '@open-data-v/base'
import { StaticDataPlugin } from '@open-data-v/data'

import { getStaticDataApi } from '@/api/data'

const QUICK_TYPE = 'QUICK'

export interface QuickDataResponse extends Response {
  id: string
  title: string
}
class QuickDataHanlder extends StaticDataPlugin.handler {
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
    super({ options, id })
    this.options = options || { dataId: '', title: '', data: {} }
  }

  public toJSON() {
    return {
      options: {
        dataId: this.options.dataId || '',
        title: this.options.title || ''
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
