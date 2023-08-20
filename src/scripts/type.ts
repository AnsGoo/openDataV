import type { Response } from 'open-data-v/data'

export interface CallbackType {
  handler?: (resp: any, options: Record<string, any>) => any
  error?: Error
}
export interface ScriptOption {
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

export interface Slotter {
  afterCallbackChange: (handler: BaseScript) => void
  scriptConfig: BaseScript
}

export interface ResponseData<T = any> extends Response {
  afterData: T
}
