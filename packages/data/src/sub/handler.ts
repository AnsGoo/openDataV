import type { DataAcceptor, DataInstance, Response } from '@open-data-v/base'
import { eventBus, useEventBus, uuid } from '@open-data-v/base'

class SubRequestData implements DataInstance {
  public channel?: string
  public accessor: DataAcceptor | undefined
  public id: string
  public type = 'SUB'
  private debugCallback: DataAcceptor | undefined

  private callback: DataAcceptor | undefined
  constructor({ channel, id }: { channel?: string; id: string }) {
    this.channel = channel
    this.id = id || uuid()
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

  public toJSON() {
    return {
      channel: this.channel || '',
      type: this.type,
      id: this.id
    }
  }

  public close() {
    if (!this.channel) {
      return
    }
    eventBus.off(this.channel, this.accessor)
  }
  public updateOption(options: { channel?: string }) {
    this.channel = options?.channel || ''
    this.close()
    this.connect(this.accessor || (() => {}))
  }

  public async connect(acceptor: DataAcceptor) {
    this.accessor = acceptor
    this._connect()
  }

  private _connect() {
    if (!this.channel) {
      return
    }
    eventBus.on(this.channel, this.callback)
  }
  private reConent() {
    if (!this.channel) {
      return
    }
    eventBus.off(this.channel, this.accessor)
    this._connect()
  }
  public async debug(acceptor: DataAcceptor) {
    this.debugCallback = acceptor
    this.reConent()
  }
}
export default SubRequestData
