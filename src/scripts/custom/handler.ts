import { makeFunction } from '@/utils/data'

import type { BaseScript } from '../base'

class CustomScript implements BaseScript {
  public type = 'Custom'
  public key: string
  public afterCallback?: (data: any, propValue: Recordable) => any

  constructor(key: string) {
    this.key = key
    this.buildAfterCallback()
  }

  public buildAfterCallback() {
    const fun = makeFunction('Javascript', this.key, ['data', 'options'], false)
    if (fun && fun.handler) {
      this.afterCallback = (data: any, propValue: Recordable) => fun.handler!(data, propValue)
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
