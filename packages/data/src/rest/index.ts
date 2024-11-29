import { defineAsyncComponent, shallowRef } from 'vue'

import { uuid } from '../utils'
import RestHandler from './handler'
import { RequestMethod } from './requestEnums'
import type { RestOption, RestResponse } from './type'
import { KVToRecordable, recordabletoKV, requestOptionsToStore } from './utils'

const RestPane = defineAsyncComponent(() => import('./Pane.vue'))

const RestContent = defineAsyncComponent(() => import('./RestDataView.vue'))

export default {
  type: 'REST',
  name: '动态数据',
  component: shallowRef(RestPane),
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
  RestPane
}

export type { RestOption, RestResponse }
