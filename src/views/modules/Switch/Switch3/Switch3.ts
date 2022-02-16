import { ComponentGroup } from '@/enum'
import type { ComponentInfo, GroupType, ComponentOptions } from '@/types/component'

const component: ComponentInfo = {
  component: 'Switch3',
  label: '带状态的开关',
  group: ComponentGroup.SWITCH,
  propValue: {
    url: '/Scan/WritePoint',
    tagName: 'CMJ_ZDHQDXNTZ',
    status: true
  },
  style: {
    width: 50,
    height: 30
  }
}
const style: Array<GroupType> = []

const attrs: Array<GroupType> = [
  {
    name: '数据项配置',
    uid: 'datas',
    children: [
      {
        key: 'tagName',
        label: 'path点',
        type: 'text'
      },
      {
        key: 'url',
        label: '请求地址',
        type: 'text'
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
