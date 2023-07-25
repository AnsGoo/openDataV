import type { BaseScript } from '../base'
import funcs from './scripts'

class SystemScript implements BaseScript {
  public type = 'System'
  public key: string
  public extendParams: Record<string, any>
  public afterCallback?: (data: any, propValue: Record<string, any>) => any

  constructor(key: string, extendParams: Record<string, any> = {}) {
    this.key = key
    this.extendParams = extendParams
    this.buildAfterCallback()
  }

  public buildAfterCallback() {
    const fun = funcs[this.key]
    if (!fun) {
      return
    }
    this.afterCallback = (data: any, _propValue: Record<string, any>) =>
      fun.func(data, this.extendParams)
  }
  public getFuncs() {
    return funcs
  }
  public toJSON() {
    return {
      key: this.key,
      extendParams: this.extendParams,
      type: 'System'
    }
  }
}

export default SystemScript
