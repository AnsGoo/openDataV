import { RequestMethod, RestHandler } from '@open-data-v/data'
import { defineAsyncComponent, shallowRef } from 'vue'

import { apiHttp as http } from '@/utils/http'
import { uuid } from '@/utils/utils'

class RestRequestHandler extends RestHandler {
  constructor(options) {
    const connector = http
    super(options, connector)
  }
}

export default {
  type: 'REST',
  name: '动态数据',
  component: shallowRef(defineAsyncComponent(() => import('./Pane.vue'))),
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
