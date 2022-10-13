import { getStaticData, StaticDataDetail } from '@/api/data'
import useRestRequest, { RestRequest } from '@/ApiView/hooks/http'
import { AfterScript, StoreRequestOption } from '@/ApiView/hooks/http/type'
import { makeFunction } from '@/utils/data'
import { cloneDeep } from 'lodash-es'
import { RequestResponse } from './type'

export enum DataType {
  STATIC = 'STATIC',
  REST = 'REST',
  REALTIME = 'REALTIME',
  DEMO = 'DEMO'
}

export enum DataIntegrationMode {
  SELF = 'SELF',
  UNIVERSAL = 'UNIVERSAL',
  GLOBAL = 'GLOBAL'
}

export interface StaticRequestOptions {
  dataId: string
  title?: string
  type: DataType
  script?: AfterScript
}

export interface DemoData {
  data: any
}
export interface RestRequestOptions {
  restOptions: StoreRequestOption
  type: DataType
}

interface RequestData {
  toJSON: () => Recordable<any> | undefined
  getRespData: (options?: Recordable) => Promise<RequestResponse<any>>
}

class DemoRequestData implements RequestData {
  public data: any

  constructor(data: any) {
    this.data = data
  }
  public toJSON() {
    return undefined
  }

  public async getRespData(_?: Recordable): Promise<RequestResponse<any>> {
    const response = {
      status: 0,
      data: this.data,
      afterData: this.data
    }
    return response
  }
}

class StaticRequestData implements RequestData {
  public dataId?: string
  public afterScript?: AfterScript
  public title?: string

  constructor(id: string | undefined, afterScript?: AfterScript) {
    this.dataId = id
    this.afterScript = afterScript
  }

  public toJSON(): StaticRequestOptions {
    return {
      dataId: this.dataId || '',
      type: DataType.STATIC,
      script: this.afterScript,
      title: this.title
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
    if (!this.dataId) {
      return response
    }
    const afterCallback =
      this.afterScript && this.afterScript.code
        ? makeFunction(this.afterScript.type, this.afterScript.code, ['resp', 'options'], false)
        : undefined
    try {
      const resp = await getStaticData(this.dataId!)
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

class RestRequestData implements RequestData {
  public requestInstance: RestRequest
  public requestOptions: StoreRequestOption

  constructor(options: StoreRequestOption) {
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

  public toJSON(): RestRequestOptions {
    return {
      restOptions: cloneDeep(this.requestOptions),
      type: DataType.REST
    }
  }
}

export { StaticRequestData, RestRequestData, RequestData, DemoRequestData }