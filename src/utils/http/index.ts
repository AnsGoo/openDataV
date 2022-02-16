import Axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse, AxiosError } from 'axios'
import { httpConfig, ResultType } from '@/utils/http/config'
import { useUserStoreWithOut } from '@/store/modules/user'
import { useRouter, useRoute } from 'vue-router'
import { LOGIN_URL } from '@/enum'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import type { Router, RouteLocationNormalizedLoaded as Route } from 'vue-router'
const route: Route = useRoute()

class AxiosHttp {
  private axiosInstance: AxiosInstance
  private isBlock = false
  private isLogout = false
  constructor(isBlock = false, isLogout = false) {
    this.axiosInstance = Axios.create(httpConfig())
    this.httpHookRequest()
    this.httpHookResponse()
    this.isBlock = isBlock
    this.isLogout = isLogout
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
        const basicStore = useBasicStoreWithOut()
        if (this.isBlock && basicStore.isEditMode) {
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
        return response.data
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
  private errorHandler(status: number, message?: string): void {
    const router: Router = useRouter()
    const userStore = useUserStoreWithOut()
    switch (status) {
      case 401: {
        // 未登录
        if (this.isLogout) {
          userStore.logout()
          router.push({
            path: LOGIN_URL,
            query: {
              redirect: route.fullPath
            }
          })
        }
        break
      }
      case 403: {
        // 跳转到登录页面，并删除 Token 记录
        router.push({ name: '403' })
        break
      }
      default: {
        console.log(message)
      }
    }
  }

  public get<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'GET' })
  }

  public post<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'POST' })
  }

  public put<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'PUT' })
  }

  public patch<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'PATCH' })
  }

  public delete<T = any>(config: AxiosRequestConfig): Promise<T> {
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
const apiHttp = new AxiosHttp(false, true)
export { http, apiHttp }
