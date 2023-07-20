export interface Response {
  status: 'SUCCESS' | 'FAILED'
  data: any
}

type RequestOption = any

export interface RequestOptions<T = RequestOption> {
  options: T
  type: string
}

export type DataAcceptor = (result: any, id?: string) => void
interface DataInstance {
  toJSON: () => any | undefined
  connect: (dataAcceptor: DataAcceptor) => void
  close?: () => void
}
export { DataInstance }
