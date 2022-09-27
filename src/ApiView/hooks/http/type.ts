import { ScriptType } from '@/components/ScriptsEdtor/eunm'
import type { AxiosResponse, Method } from 'axios'

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
  afterScript: RequestAfterScript
}

export interface RequestResponse {
  code: number
  data: string
  afterData: string
  headers: Recordable<string>
}

export interface RequestAfterScript {
  type: ScriptType
  code: string
}

export interface AfterScript {
  type: ScriptType
  code: string
}

export declare type FinallyResponse<T> = AxiosResponse<T> & { afterData: any }
