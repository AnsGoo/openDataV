import type { AxiosResponse, Method } from 'axios'

export interface AfterScript {
  id?: string
  code: string
  type: string
}

export interface KV {
  key: string
  value: string
  disable: boolean
  id: string
}

export interface RestOption {
  method: Method
  url: string
  headers: Array<KV>
  params: Array<KV>
  data: Array<KV>
  otherConfig: {
    isRepeat: boolean
    interval: number
  }
}

export interface WebsocketOption {
  url: string
  message: string
  timeout: number
  isRetry: boolean
  maxRetryCount: number
}

export interface StoreRestOption {
  method: Method
  url: string
  headers: Recordable
  params: Recordable
  data: Recordable
  otherConfig: {
    isRepeat: boolean
    interval: number
  }
}

export interface StoreStaticOption {
  id: string
  title?: string
}

export interface RequestResponse {
  status: number
  data: string
  headers?: Recordable<string>
  [key: string]: any
}

export declare type FinallyResponse<T> = AxiosResponse<T> & { afterData: any }

export interface CallbackType {
  handler?: (resp: any, options: Recordable) => any
  error?: Error
}
