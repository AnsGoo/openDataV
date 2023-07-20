import type { Method } from 'axios'

export interface KV {
  key: string
  value: string
  disable: boolean
  id: string
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

export interface RequestResponse {
  status: number
  data: string
  headers?: Recordable<string>
  [key: string]: any
}
