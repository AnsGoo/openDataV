import type { DataType } from '@/enum/data'

import type { RequestResponse, StoreRestOption, StoreStaticOption } from './type'

type RequestOption = StoreStaticOption | StoreRestOption

export interface RequestOptions<T = RequestOption> {
  options: T
  type: DataType
}

export interface DemoData<T = any> {
  data: T
}

interface RequestDataInstance {
  toJSON: () => any | undefined
  getRespData?: (options?: Recordable) => Promise<RequestResponse<any>>
  pubData?: (
    options?: Recordable,
    callback?: (result: any, type: DataType | string) => void
  ) => Promise<void>
  close?: () => void
}

export { RequestDataInstance }
