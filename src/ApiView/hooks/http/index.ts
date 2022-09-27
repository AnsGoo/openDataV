import Axios from 'axios'
import type { AxiosInstance, AxiosResponse, Method } from 'axios'
import { AfterScript, FinallyResponse, RequestOption } from './type'
import { ScriptType } from '@/components/ScriptsEdtor/eunm'
import { cloneDeep } from 'lodash-es'
import { message, notification } from '@/utils/message'
import { KVToRecordable } from './utils'

interface CallbackType {
  handler?: Function
  error?: Error
}

class RestRequest {
  private axiosInstance: AxiosInstance
  public url: string
  public params: Recordable<string | number> | undefined
  public data: any
  private callback: CallbackType | undefined

  constructor(requestOption: RequestOption) {
    const headers = KVToRecordable(requestOption.headers)
    const method = requestOption.method as Method
    this.url = requestOption.url
    this.params = KVToRecordable(requestOption.params)
    this.data = KVToRecordable(requestOption.data)
    const script = {
      code: requestOption.afterScript.code,
      type: requestOption.afterScript.type
    }
    this.axiosInstance = Axios.create({ method, headers })

    if (script) {
      this.callback = this.makeDataHandler(script)
    } else {
      this.callback = undefined
    }
    // const resp = await axiosInstance.request({url,params,data})
  }
  public request<T = any>(args?: Recordable<any>): Promise<FinallyResponse<T>> {
    return new Promise<FinallyResponse<T>>((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse>({ url: this.url, params: this.params, data: this.data })
        .then((resp: AxiosResponse) => {
          const result = cloneDeep(resp) as FinallyResponse<T>
          if (this.callback) {
            if (this.callback.handler) {
              try {
                const afterData = this.callback.handler(result.data, args || {})
                if (afterData) {
                  result.afterData = afterData
                } else {
                  message.warning('请检查后置脚本是否有返回值')
                  result.afterData = resp.data
                }
              } catch (err) {
                reject(err)
              }
            } else {
              reject(this.callback.error)
            }
          } else {
            result.afterData = resp.data
          }
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  public makeDataHandler(script: AfterScript): CallbackType | undefined {
    if (script.code && script.type === ScriptType.Javascript) {
      return this.createJsFunction(script)
    } else {
      return undefined
    }
  }
  private createJsFunction(script: AfterScript): CallbackType {
    try {
      const handler = new Function('resp', 'options', script.code)
      return { handler }
    } catch (err: any) {
      notification.error({
        title: '脚本语法错误',
        content: err.message,
        duration: 10000,
        closable: false
      })
      return { error: err }
    }
  }
}

export default function useRestRequest(requestOption: RequestOption) {
  return new RestRequest(requestOption)
}
