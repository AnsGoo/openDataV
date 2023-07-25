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
