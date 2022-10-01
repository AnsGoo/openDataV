import Axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'
import { AfterScript, FinallyResponse, StoreRequestOption } from './type'
import { cloneDeep } from 'lodash-es'
import { message } from '@/utils/message'
import { CallbackType, makeFunction } from '@/utils/data'

export class RestRequest {
  private axiosInstance: AxiosInstance
  public url: string
  public params: Recordable<string | number> | undefined
  public data: any
  private callback: CallbackType | undefined

  constructor(requestOption: StoreRequestOption) {
    const { headers, method, url, params, data, afterScript } = requestOption
    this.url = url
    this.params = params
    this.data = data
    this.axiosInstance = Axios.create({ method, headers })

    if (afterScript) {
      this.callback = this.makeDataHandler(afterScript)
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
    return makeFunction(script.type, script.code, ['resp', 'options'])
  }
}

export default function useRestRequest(requestOption: StoreRequestOption) {
  return new RestRequest(requestOption)
}
