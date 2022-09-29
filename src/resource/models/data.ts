import useRestRequest, { RestRequest } from '@/ApiView/hooks/http'
import { RequestOption } from '@/ApiView/hooks/http/type'
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

class StaticRequestData {
  public dataProtocol: DataProtocol = DataProtocol.JSON
  public data: any = null

  constructor(data: any, protocol: DataProtocol) {
    this.dataProtocol = protocol
    this.data = this.loads(data, protocol)
  }

  public toJSON() {
    return {
      protocol: this.dataProtocol,
      data: this.dumps(),
      type: DataType.STATIC
    }
  }

  private dumps(): string | undefined {
    switch (this.dataProtocol) {
      case DataProtocol.String:
        return String(this.data)
      case DataProtocol.Number:
        return String(this.data)
      case DataProtocol.JSON:
        return JSON.stringify(this.data)
      case DataProtocol.Boolean:
        return String(isBoolean(this.data))
    }
  }
  private loads(data: any, protocol: DataProtocol): any | undefined {
    switch (protocol) {
      case DataProtocol.String:
        return String(data)
      case DataProtocol.Number:
        return Number(data)
      case DataProtocol.JSON:
        return JSON.parse(data)
      case DataProtocol.Boolean:
        return isBoolean(data)
      default:
        return data
    }
  }
  public getRespData() {
    return this.data
  }
}

class RestRequestData {
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

  public toJSON(): Recordable<any> {
    return {
      requestOPtions: cloneDeep(this.requestOPtions),
      type: DataType.REST
    }
  }
}

export { StaticRequestData, RestRequestData }
