import { cloneDeep } from 'lodash-es'

import { DataType } from '@/enum/data'
import type { RequestData, RequestOptions } from '@/models/requestOption'
import type { RequestResponse } from '@/models/type'
import type { AfterScript } from '@/types/component'
import type { CallbackType } from '@/utils/data'
import { makeFunction } from '@/utils/data'

class StaticRequestData implements RequestData {
  public afterScript?: AfterScript
  public data?: any
  public callback?: CallbackType | undefined

  constructor({ data, script }: { data: string; script?: AfterScript }) {
    this.data = data
    this.afterScript = script
    this.callback =
      this.afterScript && this.afterScript.code
        ? makeFunction(this.afterScript.type, this.afterScript.code, ['resp', 'options'], false)
        : undefined
  }

  public toJSON(): RequestOptions<{ data: string; script?: AfterScript }> {
    return {
      options: {
        script: cloneDeep(this.afterScript),
        data: this.data
      },
      type: DataType.STATIC
    }
  }

  public async getRespData(options?: Recordable): Promise<RequestResponse<any>> {
    const response: RequestResponse<any> = {
      status: -1,
      data: '',
      afterData: '',
      headers: {}
    }
    let parseData = {}
    try {
      parseData = JSON.parse(this.data)
      response.afterData = parseData
      response.status = 200
    } catch (err: any) {
      response.afterData = err.message || err
      return response
    }

    if (this.callback && this.callback.handler) {
      try {
        response.afterData = this.callback.handler(parseData, options || {})
        response.status = 200
      } catch (err: any) {
        response.status = -1
        response.afterData = err.message || err
      }
    }

    return response
  }
}
export default StaticRequestData
