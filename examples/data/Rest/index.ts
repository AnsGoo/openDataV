import handler from 'open-data-v/apiView/rest/handler'
import { RequestMethod } from 'open-data-v/apiView/rest/requestEnums'
import { uuid } from 'open-data-v/apiView/utils'
import { shallowRef } from 'vue'

import DataView from './View.vue'

export default {
  type: 'REST',
  name: '动态数据',
  component: shallowRef(DataView),
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
