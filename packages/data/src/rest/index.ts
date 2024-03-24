import { shallowRef } from 'vue'

import { uuid } from '../utils'
import RestHandler from './handler'
import RestPane from './Pane.vue'
import { RequestMethod } from './requestEnums'
import RestContent from './RestDataView.vue'
import type { RestOption, RestResponse } from './type'
import { KVToRecordable, recordabletoKV, requestOptionsToStore } from './utils'

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
