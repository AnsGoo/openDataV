import { shallowRef } from 'vue'

import { uuid } from '../utils'
import handler from './handler'
import RestPane from './Pane.vue'
import { RequestMethod } from './requestEnums'
import RestContent from './Rest.vue'
import type { RestOption, RestResponse } from './type'
import { KVToRecordable, recordabletoKV, requestOptionsToStore } from './utils'

export default {
  type: 'REST',
  name: '动态数据',
  component: shallowRef(RestPane),
  handler,
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
export {
  handler,
  KVToRecordable,
  recordabletoKV,
  RequestMethod,
  requestOptionsToStore,
  RestContent,
  RestPane
}

export type { RestOption, RestResponse }
