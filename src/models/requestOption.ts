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

interface RequestData {
  toJSON: () => any | undefined
  getRespData: (
    options?: Recordable,
    callback?: (result: any, type: DataType | string) => void,
    type?: string
  ) => Promise<RequestResponse<any>> | Promise<void>
}

export { RequestData }
