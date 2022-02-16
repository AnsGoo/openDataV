import { ComponentGroup } from '@/enum'
import type { ComponentOptions, GroupType, ComponentInfo } from '@/types/component'
const component: ComponentInfo = {
  component: 'TermodynamicChart3',
  label: '3D热力图',
  group: ComponentGroup.LINE,
  propValue: {
    history: 'http://192.168.10.111:3000/caches',
    startTime: '2022-01-24 14:00:00',
    endTime: '2022-01-24 20:00:00'
  },
  style: {
    width: 1050,
    height: 350
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
        key: 'history',
        label: '初始化地址',
        type: 'text'
      },
      {
        key: 'startTime',
        label: '开始时间',
        type: 'text'
      },
      {
        key: 'endTime',
        label: '结束时间',
        type: 'text'
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
