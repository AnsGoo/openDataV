import { cloneDeep } from 'lodash-es'

import type { StaticDataDetail } from '@/api/data'
import { getStaticDataApi } from '@/api/data'
import { DataType } from '@/enum/data'
import type {
  DataAcceptor,
  RequestDataInstance,
  RequestOptions,
  Response
} from '@/models/requestOption'
import type { StoreStaticOption } from '@/models/type'
import type { AfterScript } from '@/types/component'
import type { CallbackType } from '@/utils/data'
import { makeFunction } from '@/utils/data'

const QUICK_TYPE = 'QUICK'
class QuickRequestData implements RequestDataInstance {
  public id?: string
  public afterScript?: AfterScript
  public title?: string
  public callback?: CallbackType

  constructor({ id, script }: { id: string | undefined; script?: AfterScript }) {
    this.id = id
    this.afterScript = script
    this.callback =
      this.afterScript && this.afterScript.code
        ? makeFunction(this.afterScript.type, this.afterScript.code, ['resp', 'options'], false)
        : undefined
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

  public async connect(acceptor: DataAcceptor, options?: Recordable) {
    const resp = await this.getRespData(options)
    acceptor(resp)
  }
  public async getRespData(options?: Recordable): Promise<Response> {
    const response: Response = {
      status: 'SUCCESS',
      data: '',
      afterData: ''
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
        response.afterData = data.data
      }
    } catch (err: any) {
      response.status = 'FAILED'
      response.data = err.stack || err.message
      response.afterData = err.stack || err.message
    }
    if (this.callback && this.callback.handler) {
      try {
        response.afterData = this.callback.handler(response.data, options || {})
      } catch (err: any) {
        response.afterData = err.message || err
      }
    }
    return response
  }
}

export { QUICK_TYPE }
export default QuickRequestData
