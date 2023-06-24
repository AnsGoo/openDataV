export interface Response {
  status: 'SUCCESS' | 'FAILED'
  data: any
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
  connect: (dataAcceptor: DataAcceptor) => void
  close?: () => void
}
export { RequestDataInstance }
