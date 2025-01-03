import type { DataAcceptor, Response } from '@open-data-v/base'
import { eventBus } from '@open-data-v/base'

import { BaseDataHandler } from '../base/handler'

export interface SubOption {
  channel: string
}

class SubDataHanlder extends BaseDataHandler<SubOption> {
  public channel?: string
  public accessor: DataAcceptor | undefined
  private debugCallback: DataAcceptor | undefined

  private callback: DataAcceptor | undefined
  constructor({ options, id }: { options?: SubOption; id: string }) {
    super({ options, id })
    this.callback = (event: any) => {
      const response: Response = {
        status: 'SUCCESS',
        data: event
      }
      if (this.debugCallback) {
        this.debugCallback(event)
      }
      this.callback && this.callback(response, 'SUB')
    }
  }

  public get type(): string {
    return 'SUB'
  }

  public close() {
    const { channel } = this.options || {}
    if (!channel) {
      return
    }
    eventBus.off(channel, this.acceptor)
  }

  public async reconnect() {
    const { channel } = this.options || {}
    this.close()
    if (!channel) {
      return
    }
    eventBus.on(channel, this.callback!)
  }
  public async debug(acceptor: DataAcceptor) {
    this.debugCallback = acceptor
  }
}
export default SubDataHanlder
