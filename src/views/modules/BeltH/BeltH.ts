import { ComponentGroup } from '@/enum'
import type { ComponentOptions, GroupType, ComponentInfo } from '@/types/component'

const component: ComponentInfo = {
  component: 'BeltH',
  label: '刮板机',
  group: ComponentGroup.MACHINEIMG,
  propValue: {
    url: 'http://192.168.66.33:60000/Scan/ReadPointValues',
    tagName: 'YMXT_QBYSJYXZT'
  },
  style: {
    width: 310,
    height: 40
  }
}
const style: Array<GroupType> = []

const attrs: Array<GroupType> = [
  {
    name: '基本配置',
    uid: 'basic',
    children: []
  },
  {
    name: '数据项配置',
    uid: 'datas',
    children: [
      {
        key: 'url',
        label: '提交地址',
        type: 'text'
      },
      {
        key: 'tagName',
        label: 'path点',
        type: 'text'
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
