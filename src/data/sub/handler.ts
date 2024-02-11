import { eventBus, useEventBus } from 'open-data-v/base'

import type { DataAcceptor, DataInstance, RequestOptions, Response } from '../type'

class SubRequestData implements DataInstance {
  public channel?: string

  constructor({ channel }: { channel?: string }) {
    this.channel = channel
  }

  public toJSON(): RequestOptions<{ channel: string }> {
    return {
      options: {
        channel: this.channel || ''
      },
      type: 'STATIC'
    }
  }

  public close() {
    if (!this.channel) {
      return
    }
    eventBus.off(this.channel)
  }

  public async connect(acceptor: DataAcceptor) {
    if (!this.channel) {
      return
    }
    useEventBus(this.channel, (event) => {
      const response: Response = {
        status: 'SUCCESS',
        data: event
      }
      acceptor && acceptor(response, 'SUB')
    })
  }

  public async debug(acceptor: DataAcceptor) {
    this.connect(acceptor)
  }
}
export default SubRequestData
