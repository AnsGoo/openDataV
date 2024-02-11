import type { RequestInstance, WebSocketInstance } from 'open-data-v/data/hooks'

export * from './rest/type'

export interface DataConfig {
  type: string
  dataInstance: DataInstance
}
export interface Slotter {
  dataConfig: DataConfig
  changeDataConfig: (config: DataConfig) => void
}

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
export interface DataInstance {
  toJSON: () => any | undefined
  connect: (dataAcceptor: DataAcceptor) => void
  close: () => void
  debug: (dataAcceptor: DataAcceptor) => void
}

export type DataHandler = new (
  options?: Record<string, any>,
  connector?: RequestInstance | WebSocketInstance | any
) => DataInstance
