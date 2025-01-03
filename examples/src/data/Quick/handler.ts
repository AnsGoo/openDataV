import type { Response } from '@open-data-v/base'
import { StaticDataPlugin } from '@open-data-v/data'

import { getStaticDataApi } from '@/api/data'

const QUICK_TYPE = 'QUICK'

export interface QuickDataResponse extends Response {
  id: string
  title: string
}
class QuickDataHanlder extends StaticDataPlugin.handler {
  public options: {
    dataId: string | undefined
    title: string
    data?: any
  } = { dataId: '', title: '', data: {} }

  constructor({
    options,
    id
  }: {
    options: { dataId?: string; title?: string; data?: any }
    id?: string
  }) {
    super({ options, id })
  }

  public get type() {
    return QUICK_TYPE
  }
  public toJSON() {
    const option = super.toJSON()
    delete option.options.data
    return option
  }

  public async getRespData(): Promise<Response> {
    const response: QuickDataResponse = {
      status: 'SUCCESS',
      data: '',
      id: this.id,
      title: this.options.title || ''
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
    return response
  }
}

export { QUICK_TYPE }

export default QuickDataHanlder
