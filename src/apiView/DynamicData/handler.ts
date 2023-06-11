import { cloneDeep } from 'lodash-es'

import type { RestRequest } from '@/apiView/hooks/http'
import useRestRequest from '@/apiView/hooks/http'
import { DataType } from '@/enum/data'
import type { RequestDataInstance, RequestOptions } from '@/models/requestOption'
import type { RequestResponse, StoreRestOption } from '@/models/type'

class RestRequestData implements RequestDataInstance {
  public requestInstance: RestRequest
  public requestOptions: StoreRestOption

  constructor(options: StoreRestOption) {
    this.requestOptions = options
    this.requestInstance = useRestRequest(options, false)
  }

  public async getRespData(options?: Recordable): Promise<RequestResponse<any>> {
    try {
      return await this.requestInstance.request(options || {})
    } catch (err: any) {
      const response: RequestResponse<any> = {
        status: 0,
        data: '',
        afterData: '',
        headers: {}
      }
      const result = err.response || (err.toJSON ? err.toJSON() : {})
      response.status = result.status
      response.data = err.stack || err.message
      response.afterData = err.stack || err.message
      response.headers = result.headers || result?.config?.headers || {}
      return response
    }
  }

  public toJSON(): RequestOptions<StoreRestOption> {
    return {
      options: cloneDeep(this.requestOptions),
      type: DataType.REST
    }
  }
}

export default RestRequestData
