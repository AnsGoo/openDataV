export interface Response {
  status: 'SUCCESS' | 'FAILED'
  data: any
  afterData: any
}

type RequestOption = any

export interface RequestOptions<T = RequestOption> {
  options: T
  type: string
}

export interface DemoData<T = any> {
  data: T
}

export type DataAcceptor = (result: any, id?: string) => void
interface RequestDataInstance {
  toJSON: () => any | undefined
  getRespData?: (options?: Recordable) => Promise<Response>
  pubData?: (callback: DataAcceptor, options?: Recordable) => Promise<void>
  connect: (dataAcceptor: DataAcceptor, _options?: Recordable) => void
  close?: () => void
}
export { RequestDataInstance }
