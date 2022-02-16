import { ComponentGroup } from '@/enum'
import type { ComponentOptions, GroupType, ComponentInfo } from '@/types/component'

const component: ComponentInfo = {
  component: 'Belt',
  label: '皮带',
  group: ComponentGroup.MACHINEIMG,
  propValue: {
    url: 'http://192.168.66.33:60000/Scan/ReadPointValues',
    tagName1: 'PD_PDYXZT',
    tagName2: 'YMXT_ZZJYXZT'
  },
  style: {
    width: 80,
    height: 310
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
        label: '初始化地址',
        type: 'text'
      },
      {
        key: 'tagName1',
        label: '胶带运输机的path点',
        type: 'text'
      },
      {
        key: 'tagName2',
        label: '刮板的path点',
        type: 'text'
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
