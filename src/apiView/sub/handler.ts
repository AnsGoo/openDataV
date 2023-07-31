import type { DataAcceptor, DataInstance, RequestOptions, Response } from 'open-data-v/apiView/type'
import { eventBus, useEventBus } from 'open-data-v/bus'

class SubRequestData implements DataInstance {
  public channel: string

  constructor({ channel }: { channel: string }) {
    this.channel = channel
  }

  public toJSON(): RequestOptions<{ channel: string }> {
    return {
      options: {
        channel: this.channel
      },
      type: 'STATIC'
    }
  }

  public close() {
    eventBus.off(this.channel)
  }

  public async connect(acceptor: DataAcceptor) {
    useEventBus(this.channel, (event) => {
      const response: Response = {
        status: 'SUCCESS',
        data: event
      }
      acceptor && acceptor(response, 'SUB')
    })
  }
}
export default SubRequestData
