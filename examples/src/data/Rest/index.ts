import { uuid } from '@open-data-v/base'
import { RequestMethod, RestHandler } from '@open-data-v/data'
import { defineAsyncComponent, shallowRef } from 'vue'

import { apiHttp as http } from '@/utils/http'

class RestRequestHandler extends RestHandler {
  constructor({ options, id }: { options: any; id?: string }) {
    super({ options, id, connector: http })
  }

  get type() {
    return 'REST-DEMOE'
  }
}

export default {
  type: 'REST-DEMOE',
  name: '动态数据',
  component: shallowRef(defineAsyncComponent(() => import('./panel.vue'))),
  handler: RestRequestHandler,
  useTo: ['COMPONENT', 'GLOBAL'],
  getdefaultOption: () => {
    return {
      method: RequestMethod.GET,
      url: '/getRiskArea',
      headers: [{ key: '', value: '', disable: false, id: uuid() }],
      params: [{ key: '', value: '', disable: false, id: uuid() }],
      data: [{ key: '', value: '', disable: false, id: uuid() }],
      otherConfig: {
        isRepeat: false,
        interval: 1000
      }
    }
  }
}
