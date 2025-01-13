import type { DataAcceptor, DataInstance, Response } from '@open-data-v/base'
import { uuid } from '@open-data-v/base'

class DemoRequestData implements DataInstance {
  public data: any
  public id: string
  private acceptor: DataAcceptor | undefined
  public type: 'DEMO' = 'DEMO' // 直接赋值
  constructor({ data, id }: { data: any; id?: string }) {
    this.data = data
    this.id = id || uuid()
  }
  disposeDebug() {}
  reconnect() {}
  updateOption(_options: any) {}

  public toJSON() {
    return undefined
  }

  public async connect(acceptor: DataAcceptor, options?: Record<string, any>) {
    this.acceptor = acceptor
    const resp = await this.getRespData(options)
    acceptor(resp)
  }

  public async getRespData(_?: Record<string, any>): Promise<Response> {
    return {
      status: 'SUCCESS',
      data: this.data
    }
  }

  public async debug(acceptor: DataAcceptor) {
    const resp = await this.getRespData()
    acceptor(resp)
    this.acceptor?.(resp)
  }

  close(): void {}
}

export default DemoRequestData
