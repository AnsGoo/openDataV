import type { AxiosResponse, Method } from 'axios'

import type { ScriptType } from '@/enum'

export interface AfterScript {
  id?: string
  code: string
  type: ScriptType
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
  afterScript: AfterScript
  otherConfig: {
    isRepeat: boolean
    interval: number
  }
}

export interface WebsocketOption {
  url: string
  message: string
  afterScript: AfterScript
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
  afterScript: AfterScript
  otherConfig: {
    isRepeat: boolean
    interval: number
  }
}

export interface StoreStaticOption {
  id: string
  title?: string
  script?: AfterScript
}

export interface RequestResponse {
  status: number
  data: string
  afterData: string
  headers?: Recordable<string>
  [key: string]: any
}

export declare type FinallyResponse<T> = AxiosResponse<T> & { afterData: any }

export interface CallbackType {
  handler?: (resp: any, options: Recordable) => any
  error?: Error
}
