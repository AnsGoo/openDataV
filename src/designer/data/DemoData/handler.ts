import type { DataAcceptor, DataInstance, Response } from '@/models/type'

class DemoRequestData implements DataInstance {
  public data: any

  constructor({ data }: { data: any }) {
    this.data = data
  }
  public toJSON() {
    return undefined
  }

  public async connect(acceptor: DataAcceptor, options?: Recordable) {
    const resp = await this.getRespData(options)
    acceptor(resp)
  }

  public async getRespData(_?: Recordable): Promise<Response> {
    return {
      status: 'SUCCESS',
      data: this.data
    }
  }
}

export default DemoRequestData
