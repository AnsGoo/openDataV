import type { CustomComponent } from './component'

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

interface ScriptOption {
  type: string
  key: string
  [extra: string]: any
}

export interface BaseScript {
  type: string
  key: string
  toJSON: () => ScriptOption | undefined
  afterCallback?: (data: any, propValue: Record<string, any>) => any
}
export type BaseComponent = { new (id?: string, name?: string, icon?: string): CustomComponent }
