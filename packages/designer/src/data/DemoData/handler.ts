import type { DataAcceptor, DataInstance, Response } from '@open-data-v/base'

class DemoRequestData implements DataInstance {
  public data: any

  constructor({ data }: { data: any }) {
    this.data = data
  }
  public toJSON() {
    return undefined
  }

  public async connect(acceptor: DataAcceptor, options?: Record<string, any>) {
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
  }

  close(): void {}
}

export default DemoRequestData
