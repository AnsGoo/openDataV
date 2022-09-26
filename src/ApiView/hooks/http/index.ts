import Axios from 'axios'
import type { AxiosInstance, AxiosRequestHeaders, AxiosResponse, Method } from 'axios'
import { AfterScript, FinallyResponse } from './type'
import { ScriptType } from '@/components/ScriptsEdtor/eunm'
import { cloneDeep } from 'lodash-es'
import { message } from '@/utils/message'

interface CallbackType {
  handler: Function
  options: Recordable<any>
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
            try {
              const afterData = this.callback.handler(result.data, this.callback.options)
              if (afterData) {
                result.afterData = this.callback.handler(result.data, this.callback.options)
              } else {
                message.warning('请检查后置脚本是否有返回值')
                result.afterData = resp.data
              }
            } catch (err) {
              reject(err)
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
      let handler
      try {
        handler = new Function('resp', 'options', script.code)
      } catch (err) {
        message.error('语法异常')
      }

      const options = script.pramas
      return { handler, options }
    } else {
      return undefined
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
