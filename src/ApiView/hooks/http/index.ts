import Axios from 'axios'
import type { AxiosInstance, AxiosRequestHeaders, AxiosResponse, Method } from 'axios'
import { AfterScript, FinallyResponse } from './type'
import { ScriptType } from '@/components/ScriptsEdtor/eunm'
import { cloneDeep } from 'lodash-es'
import { message, notification } from '@/utils/message'

interface CallbackType {
  handler?: Function
  options: Recordable<any>
  error?: Error
}

class RestRequest {
  private axiosInstance: AxiosInstance
  public url: string
  public params: Recordable<string | number> | undefined
  public data: any
  private callback: CallbackType | undefined

  constructor(
    method: Method,
    headers: AxiosRequestHeaders,
    url: string,
    params?: Recordable<string | number>,
    data?: any,
    script?: AfterScript
  ) {
    this.axiosInstance = Axios.create({ method, headers })
    this.url = url
    this.params = params
    this.data = data
    if (script) {
      this.callback = this.makeDataHandler(script)
    } else {
      this.callback = undefined
    }
    // const resp = await axiosInstance.request({url,params,data})
  }
  public request<T = any>(): Promise<FinallyResponse<T>> {
    return new Promise<FinallyResponse<T>>((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse>({ url: this.url, params: this.params, data: this.data })
        .then((resp: AxiosResponse) => {
          const result = cloneDeep(resp) as FinallyResponse<T>
          if (this.callback) {
            if (this.callback.handler) {
              try {
                const afterData = this.callback.handler(result.data, this.callback.options)
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
              // result.afterData = this.callback.error
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
    const options = script.pramas || {}
    try {
      const handler = new Function('resp', 'options', script.code)
      return { handler, options }
    } catch (err: any) {
      notification.error({
        title: '脚本语法错误',
        content: err.message,
        duration: 10000,
        closable: false
      })
      return { options, error: err }
    }
  }
}

export default function useRestRequest(
  method: Method,
  headers: AxiosRequestHeaders,
  url: string,
  params?: Recordable<string | number>,
  data?: Recordable<any>,
  script?: AfterScript
) {
  return new RestRequest(method, headers, url, params, data, script)
}
