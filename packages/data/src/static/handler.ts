import type { Response } from '@open-data-v/base'

import { BaseDataHandler } from '../base/handler'

export interface StaticOption {
  data?: any
}

class StaticDataHandler extends BaseDataHandler<StaticOption> {
  public data?: any
  public options: StaticOption = {
    data: ''
  }
  constructor({ options, id }: { options: StaticOption; id?: string }) {
    super({ options, id })
  }

  public get type(): string {
    return 'STATIC'
  }

  public async reconnect() {
    const resp = await this.getRespData()
    this.acceptor?.(resp)
    this.debugAcceptor?.(resp)
  }

  private async getRespData(): Promise<Response> {
    const response: Response = {
      status: 'SUCCESS',
      data: ''
    }
    try {
      response.data = this.options.data
      response.status = 'SUCCESS'
    } catch (err: any) {
      response.status = 'FAILED'
      return response
    }
    return response
  }
}
export default StaticDataHandler
