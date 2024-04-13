import type { BaseScript } from '../type'
import { makeFunction } from './utils'

class CustomScript implements BaseScript {
  public type = 'Custom'
  public key: string
  public afterCallback?: (data: any, propValue: Record<string, any>) => any

  constructor(key: string) {
    this.key = key
    this.buildAfterCallback()
  }

  public buildAfterCallback() {
    const fun = makeFunction('Javascript', this.key, ['data', 'options'], false)
    if (fun && fun.handler) {
      this.afterCallback = (data: any, propValue: Record<string, any>) =>
        fun.handler!(data, propValue)
    }
  }

  public toJSON() {
    return {
      key: this.key,
      type: this.type
    }
  }
}

export default CustomScript
