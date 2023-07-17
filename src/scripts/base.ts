export interface ComponentScriptType {
  type: string
  key: string
  [extra: string]: any
}

export interface BaseScript {
  type: string
  key: string
  toJSON: () => ComponentScriptType | undefined
  afterCallback?: (data: any, propValue: Recordable) => any
}

export interface Slotter {
  afterCallbackChange: (handler: BaseScript) => void
  scriptConfig: BaseScript
}
