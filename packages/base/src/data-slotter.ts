import type { DataHandler, DataInstance, DataOption, Slotter } from 'type'

export class DataSlotter implements Slotter {
  configs: Record<string, DataInstance> = {}
  static handlerClazzs: Record<string, DataHandler> = {}
  private callback?: (result: any, type?: string) => void

  constructor(dataOptions: Record<string, DataOption>) {
    const keys = Object.keys(dataOptions)

    keys.forEach((key) => {
      const option = dataOptions[key]
      const HandlerClazz = DataSlotter.handlerClazzs[option.type]
      if (!HandlerClazz) {
        return
      }
      this.configs[option.id] = new HandlerClazz(option)
    })
  }

  getHandler(key: string) {
    return this.configs[key]
  }
  addHandler(handler: DataInstance) {
    this.configs[handler.id] = handler
    this.callback && handler?.connect?.(this.callback)
  }
  removeHandler(key: string) {
    delete this.configs[key]
  }
  connect(callback: (result: any, type?: string) => void) {
    this.callback = callback
    const keys = Object.keys(this.configs)
    keys.forEach((key) => {
      const dataInstance = this.configs[key]
      dataInstance?.close?.()
      dataInstance?.connect?.(callback)
    })
  }
  close() {
    const keys = Object.keys(this.configs)
    keys.forEach((key) => {
      const config = this.configs[key]
      config?.close?.()
    })
  }
  toJSON(): Record<string, DataOption> {
    const keys = Object.keys(this.configs)
    const metaData = {}
    keys.forEach((key) => {
      const dataInstance = this.configs[key]
      metaData[key] = dataInstance?.toJSON?.()
    })
    return metaData
  }
}
