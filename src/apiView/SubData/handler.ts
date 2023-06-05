import { cloneDeep } from 'lodash-es'

import { eventBus } from '@/bus'
import { DataType } from '@/enum/data'
import type { RequestData, RequestOptions } from '@/models/requestOption'
import type { RequestResponse } from '@/models/type'
import type { AfterScript } from '@/types/component'
import type { CallbackType } from '@/utils/data'
import { makeFunction } from '@/utils/data'

class SubRequestData implements RequestData {
  public afterScript?: AfterScript
  public channel: string
  public callback?: CallbackType | undefined

  constructor({ channel, script }: { channel: string; script?: AfterScript }) {
    this.channel = channel
    this.afterScript = script
    this.callback =
      this.afterScript && this.afterScript.code
        ? makeFunction(this.afterScript.type, this.afterScript.code, ['resp', 'options'], false)
        : undefined
  }

  public toJSON(): RequestOptions<{ channel: string; script?: AfterScript }> {
    return {
      options: {
        script: cloneDeep(this.afterScript),
        channel: this.channel
      },
      type: DataType.STATIC
    }
  }

  public async getRespData(
    options?: Recordable,
    callback?: (result: any, type: DataType | string) => void,
    type?: DataType | string
  ): Promise<void> {
    eventBus.on(this.channel, (event) => {
      const response: RequestResponse<any> = {
        status: 200,
        data: event,
        afterData:
          this.callback && this.callback.handler
            ? this.callback.handler(event, options || {})
            : event
      }
      callback && callback(response, type!)
    })
  }
}
export default SubRequestData
