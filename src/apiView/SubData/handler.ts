import { eventBus, useEventBus } from '@/bus'
import { DataType } from '@/enum/data'
import type {
  DataAcceptor,
  RequestDataInstance,
  RequestOptions,
  Response
} from '@/models/requestOption'

class SubRequestData implements RequestDataInstance {
  public channel: string

  constructor({ channel }: { channel: string }) {
    this.channel = channel
  }

  public toJSON(): RequestOptions<{ channel: string }> {
    return {
      options: {
        channel: this.channel
      },
      type: DataType.STATIC
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
