import type { AxiosResponse, Method } from 'axios'

import type { AfterScript } from '@/types/component'

export interface KV {
  key: string
  value: string
  disable: boolean
  id: string
}

export interface RequestOption {
  method: Method
  url: string
  headers: Array<KV>
  params: Array<KV>
  data: Array<KV>
  afterScript: AfterScript
}

export interface StoreRestOption {
  method: Method
  url: string
  headers: Recordable
  params: Recordable
  data: Recordable
  afterScript: AfterScript
}

export interface StoreStaticOption {
  id: string
  title?: string
  script?: AfterScript
}

export interface RequestResponse {
  code: number
  data: string
  afterData: string
  headers: Recordable<string>
}

export declare type FinallyResponse<T> = AxiosResponse<T> & { afterData: any }
