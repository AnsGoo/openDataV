import { handler, RequestMethod } from 'open-data-v/data/rest'
import { shallowRef } from 'vue'

import { uuid } from '@/utils/utils'

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
