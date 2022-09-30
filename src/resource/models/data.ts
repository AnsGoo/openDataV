import useRestRequest, { RestRequest } from '@/ApiView/hooks/http'
import { RequestOption } from '@/ApiView/hooks/http/type'
import { CallbackType } from '@/utils/data'
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

interface RequestData {
  toJSON: () => Recordable<any>
  getRespData: () => Promise<RequestResponse>
}

class StaticRequestData implements RequestData {
  public dataProtocol: DataProtocol = DataProtocol.JSON
  public data: any = null
  public afterCallback?: CallbackType
  public options?: Recordable

  constructor(
    data: string,
    protocol: DataProtocol,
    afterCallback?: CallbackType,
    options?: Recordable
  ) {
    this.dataProtocol = protocol
    this.data = this.loads(data)
    this.afterCallback = afterCallback
    this.options = options
  }

  public toJSON(): { protocol: DataProtocol; data: any; type: DataType } {
    return {
      protocol: this.dataProtocol,
      data: cloneDeep(this.data),
      type: DataType.STATIC
    }
  }

  public dumps(data: string, isFormat = false): string | undefined {
    switch (this.dataProtocol) {
      case DataProtocol.String:
        return String(data)
      case DataProtocol.Number:
        return String(data)
      case DataProtocol.JSON:
        return isFormat ? JSON.stringify(data, null, '\t') : JSON.stringify(data)
      case DataProtocol.Boolean:
        return String(isBoolean(data))
    }
  }
  public loads(data: string): any | undefined {
    switch (this.dataProtocol) {
      case DataProtocol.String:
        this.data = String(data)
        break
      case DataProtocol.Number:
        this.data = Number(data)
        break
      case DataProtocol.JSON:
        this.data = JSON.parse(data)
        break
      case DataProtocol.Boolean:
        this.data = isBoolean(data)
        break
    }
    return this.data
  }
  public getRespData() {
    if (this.afterCallback && this.afterCallback.handler) {
      return this.afterCallback.handler(this.data, this.options || {})
    } else {
      return this.data
    }
  }
}

class RestRequestData implements RequestData {
  public requestInstance: RestRequest
  public requestOPtions: RequestOption
  public args: Recordable<any>
  constructor(options: RequestOption, args?: Recordable<any>) {
    this.requestOPtions = options
    this.requestInstance = useRestRequest(options)
    this.args = args || {}
  }

  public async getRespData(): Promise<RequestResponse> {
    try {
      return await this.requestInstance.request(this.args)
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

  public toJSON(): { restOptions: RequestOption; type: DataType } {
    return {
      restOptions: cloneDeep(this.requestOPtions),
      type: DataType.REST
    }
  }
}

export { StaticRequestData, RestRequestData, RequestData }
