import Axios from 'axios'
import type { AxiosInstance, AxiosRequestHeaders, AxiosResponse, Method } from 'axios'

class RestRequest {
  private axiosInstance: AxiosInstance
  public url:string
  public params: Recordable<string | number> | undefined
  public data: any
  private callbacks: Array<Function> = []

  constructor(method: Method, headers:AxiosRequestHeaders, url:string, params?:Recordable<string|number>,data?: any) {
    this.axiosInstance = Axios.create({ method,headers })
    this.url = url
    this.params = params
    this.data = data
    // const resp = await axiosInstance.request({url,params,data})
  }
  public request<T = any>(): Promise<AxiosResponse<T>> {
    return new Promise<AxiosResponse<T>>((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse>({url:this.url,params:this.params, data:this.data})
        .then((resp: AxiosResponse) => {
          resolve(resp as any)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  public registerDataHeadler () {
  }
}

export default function useRestRequest(method: Method, headers:AxiosRequestHeaders, url:string, params?:Recordable<string|number>,data?: Recordable<any>){
  return new RestRequest(method, headers, url, params, data)
} 