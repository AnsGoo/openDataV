import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import Axios from 'axios'
import useCanvasState from 'open-data-v/designer/state/canvas'

import { useUserStoreWithOut } from '@/store/modules/user'
import type { ResultType } from '@/utils/http/config'
import { httpConfig } from '@/utils/http/config'
import { message } from '@/utils/message'
import { Logger } from '@/utils/utils'

class AxiosHttp {
  private axiosInstance: AxiosInstance
  private isBlock = false
  constructor(isBlock = false) {
    this.axiosInstance = Axios.create(httpConfig())
    this.httpHookRequest()
    this.httpHookResponse()
    this.isBlock = isBlock
  }

  // 请求拦截
  private httpHookRequest(): void {
    this.axiosInstance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        const userStore = useUserStoreWithOut()
        // 将 Token 添加到 header 中
        const token: string | undefined = userStore.userToken
        if (token && config.headers) {
          config.headers['authorization'] = token
        }
        const canvasState = useCanvasState()
        if (this.isBlock && canvasState.isEditMode) {
          return Promise.reject('http is disable where the mode is edit')
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }

  // 响应拦截
  private httpHookResponse(): void {
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response
      },
      (error: AxiosError) => {
        const { response } = error
        if (response) {
          this.errorHandler(response.status, (response.data as any).message)
        }

        return Promise.reject(error)
      }
    )
  }

  // 异常请求处理
  private errorHandler(status: number, msg?: string): void {
    switch (status) {
      case 401:
        message.info('请登录后使用')
        break
    }
    Logger.log(status, msg)
  }

  public get<T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.request({ ...config, method: 'GET' })
  }

  public post<T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.request({ ...config, method: 'POST' })
  }

  public put<T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.request({ ...config, method: 'PUT' })
  }

  public patch<T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.request({ ...config, method: 'PATCH' })
  }

  public delete<T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.request({ ...config, method: 'DELETE' })
  }

  private request<T = any>(config: AxiosRequestConfig): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse<ResultType>>(config)
        .then((resp: AxiosResponse<ResultType>) => {
          resolve(resp as any)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

const http = new AxiosHttp(true)
const apiHttp = new AxiosHttp(false)
export { apiHttp, http }
