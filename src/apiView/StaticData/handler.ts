import { cloneDeep } from 'lodash-es'

import type { StaticDataDetail } from '@/api/data'
import { getStaticDataApi } from '@/api/data'
import { DataType } from '@/enum/data'
import type { RequestData, RequestOptions } from '@/models/requestOption'
import type { RequestResponse, StoreStaticOption } from '@/models/type'
import type { AfterScript } from '@/types/component'
import { makeFunction } from '@/utils/data'

class StaticRequestData implements RequestData {
  public id?: string
  public afterScript?: AfterScript
  public title?: string

  constructor({ id, script }: { id: string | undefined; script?: AfterScript }) {
    this.id = id
    this.afterScript = script
  }

  public toJSON(): RequestOptions<StoreStaticOption> {
    return {
      options: {
        id: this.id || '',
        script: cloneDeep(this.afterScript),
        title: this.title
      },
      type: DataType.STATIC
    }
  }

  public static dumps(data: string, isFormat = false): string | undefined {
    return isFormat ? JSON.stringify(data, null, '\t') : JSON.stringify(data)
  }
  public static loads(data: string): any | undefined {
    return JSON.parse(data)
  }
  public async getRespData(options?: Recordable): Promise<RequestResponse<any>> {
    const response: RequestResponse<any> = {
      status: -1,
      data: '',
      afterData: '',
      headers: {}
    }
    if (!this.id) {
      return response
    }
    const afterCallback =
      this.afterScript && this.afterScript.code
        ? makeFunction(this.afterScript.type, this.afterScript.code, ['resp', 'options'], false)
        : undefined
    try {
      const resp = await getStaticDataApi(this.id!)
      response.status = resp.status || -1
      if (resp.status < 400) {
        const data: StaticDataDetail = resp.data
        this.title = data.name
        response.data = data.data
        response.afterData = data.data
      }
    } catch (err: any) {
      const result = err.response || (err.toJSON ? err.toJSON() : {})
      response.status = result.status
      response.data = err.stack || err.message
      response.afterData = err.stack || err.message
      response.headers = result.headers || result?.config?.headers || {}
    }
    if (afterCallback && afterCallback.handler) {
      try {
        response.afterData = afterCallback.handler(response.data, options || {})
      } catch (err: any) {
        response.afterData = err.message || err
      }
    }
    return response
  }
}
export default StaticRequestData
