import type { Method } from 'axios'

import type { AfterScript } from '@/apiView/type'

export interface RequestResponse<T> {
  status: number
  data: any
  afterData: T
  headers?: Recordable<string>
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
