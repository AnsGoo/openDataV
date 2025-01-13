import type { DataHandler, DataInstance, DataOption, Slotter } from 'type'
import { reactive } from 'vue'

export class DataSlotter implements Slotter {
  configs: Record<string, DataInstance> = reactive({})
  static handlerClazzs: Record<string, DataHandler> = {}
  private callback?: (result: any, type?: string) => void

  constructor(dataOptions: Record<string, DataOption>) {
    this.load(dataOptions)
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
  load(metaData: Record<string, DataOption>) {
    this.close()
    const keys = Object.keys(metaData)

    keys.forEach((key) => {
      const option = metaData[key]
      const HandlerClazz = DataSlotter.handlerClazzs[option.type]
      if (!HandlerClazz) {
        return
      }
      const hanlder = new HandlerClazz(option)
      this.configs[option.id] = hanlder
      this.callback && hanlder.connect?.(this.callback)
    })
  }
}
