import type { BaseScript } from '../base'
import funcs from './scripts'

class SystemScript implements BaseScript {
  public type = 'System'
  public key: string
  public extendParams: Recordable
  public afterCallback?: (data: any, propValue: Recordable) => any

  constructor(key: string, extendParams: Recordable = {}) {
    this.key = key
    this.extendParams = extendParams
    this.buildAfterCallback()
  }

  public buildAfterCallback() {
    const fun = funcs[this.key]
    if (!fun) {
      return
    }
    this.afterCallback = (data: any, _propValue: Recordable) => fun.func(data, this.extendParams)
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
