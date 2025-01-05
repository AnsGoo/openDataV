import { uuid } from '@open-data-v/base'
import { defineAsyncComponent } from 'vue'

import { RequestMethod } from './enums'
import RestHandler from './handler'
import type { RestOption, RestResponse } from './type'
import { KVToRecordable, recordabletoKV, requestOptionsToStore } from './utils'

const RestPanel = defineAsyncComponent(() => import('./panel.vue'))

const RestContent = defineAsyncComponent(() => import('./data-view.vue'))

export default {
  name: 'REST',
  title: '动态数据',
  component: RestPanel,
  handler: RestHandler,
  useTo: ['COMPONENT', 'GLOBAL'],
  getDefaultOption: () => {
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
export {
  KVToRecordable,
  recordabletoKV,
  RequestMethod,
  requestOptionsToStore,
  RestContent,
  RestHandler,
  RestPanel
}

export type { RestOption, RestResponse }
