import useRestRequest, { RestRequest } from '@/ApiView/hooks/http'
import { RequestAfterScript, StoreRequestOption } from '@/ApiView/hooks/http/type'
import { makeFunction } from '@/utils/data'
import { cloneDeep, isBoolean } from 'lodash-es'
import { RequestResponse } from './type'

export enum DataProtocol {
  String = 'String',
  Number = 'Number',
  Boolean = 'Boolean',
  DateTime = 'DateTime',
  JSON = 'JSON'
}

export enum DataType {
  STATIC = 'STATIC',
  REST = 'REST',
  REALTIME = 'REALTIME'
}

export enum DataIntegrationMode {
  SELF = 'SELF',
  UNIVERSAL = 'UNIVERSAL',
  GLOBAL = 'GLOBAL'
}

export interface StaticRequestOptions {
  protocol: DataProtocol
  data: any
  type: DataType
  script?: RequestAfterScript
}

export type DemoData = Omit<StaticRequestOptions, 'type'>

export interface RestRequestOptions {
  restOptions: StoreRequestOption
  type: DataType
}

interface RequestData {
  toJSON: () => Recordable<any>
  getRespData: (options?: Recordable) => Promise<RequestResponse>
}

class StaticRequestData implements RequestData {
  public dataProtocol: DataProtocol = DataProtocol.JSON
  public data: any = null
  public afterScript?: RequestAfterScript

  constructor(data: string, protocol: DataProtocol, afterScript?: RequestAfterScript) {
    this.dataProtocol = protocol
    this.data = cloneDeep(data)
    this.afterScript = afterScript
  }

  public toJSON(): StaticRequestOptions {
    return {
      protocol: this.dataProtocol,
      data: cloneDeep(this.data),
      type: DataType.STATIC,
      script: this.afterScript
    }
  }

  public static dumps(data: string, protocol: DataProtocol, isFormat = false): string | undefined {
    switch (protocol) {
      case DataProtocol.String:
        return String(data)
      case DataProtocol.Number:
        return String(data)
      case DataProtocol.JSON:
        return isFormat ? JSON.stringify(data, null, '\t') : JSON.stringify(data)
      case DataProtocol.Boolean:
        return String(isBoolean(data))
    }
    return data
  }
  public static loads(data: string, protocol: DataProtocol): any | undefined {
    switch (protocol) {
      case DataProtocol.String:
        return String(data)
      case DataProtocol.Number:
        return Number(data)
      case DataProtocol.JSON:
        return JSON.parse(data)
      case DataProtocol.Boolean:
        return isBoolean(data)
    }
    return data
  }
  public getRespData(options?: Recordable) {
    const afterCallback = this.afterScript
      ? makeFunction(this.afterScript.type, this.afterScript.code, ['resp', 'options'])
      : undefined
    if (afterCallback && afterCallback.handler) {
      try {
        return afterCallback.handler(this.data, options || {})
      } catch (err) {
        return
      }
    } else {
      return this.data
    }
  }
}

class RestRequestData implements RequestData {
  public requestInstance: RestRequest
  public requestOptions: StoreRequestOption

  constructor(options: StoreRequestOption) {
    this.requestOptions = options
    this.requestInstance = useRestRequest(options)
  }

  public async getRespData(options?: Recordable): Promise<RequestResponse> {
    try {
      return await this.requestInstance.request(options || {})
    } catch (err: any) {
      const response: RequestResponse = {
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

export { StaticRequestData, RestRequestData, RequestData }
