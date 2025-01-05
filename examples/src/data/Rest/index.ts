import { uuid } from '@open-data-v/base'
import { RequestMethod, RestHandler } from '@open-data-v/data'
import { title } from 'process'
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
  name: 'REST-DEMOE',
  title: '动态数据',
  component: defineAsyncComponent(() => import('./panel.vue')),
  handler: RestRequestHandler,
  useTo: ['COMPONENT', 'GLOBAL']
}
