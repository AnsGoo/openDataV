import type { ScriptOption } from 'open-data-v/scripts'

export type DataAcceptor = (result: any, id?: string) => void
export interface DataInstance {
  toJSON: () => any | undefined
  connect: (dataAcceptor: DataAcceptor) => void
  close?: () => void
}
export interface Response {
  status: 'SUCCESS' | 'FAILED'
  data: any
}

export interface BaseScript {
  type: string
  key: string
  toJSON: () => ScriptOption | undefined
  afterCallback?: (data: any, propValue: Record<string, any>) => any
}
