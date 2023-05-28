import type { RequestResponse } from '@/apiView/type'
import type { RequestData } from '@/models/requestOption'

class DemoRequestData implements RequestData {
  public data: any

  constructor({ data }: { data: any }) {
    this.data = data
  }
  public toJSON() {
    return undefined
  }

  public async getRespData(_?: Recordable): Promise<RequestResponse> {
    return {
      status: 0,
      data: this.data,
      afterData: this.data
    }
  }
}

export default DemoRequestData
