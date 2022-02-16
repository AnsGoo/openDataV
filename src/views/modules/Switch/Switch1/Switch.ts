import { ComponentGroup } from '@/enum'
import type { ComponentInfo, GroupType, ComponentOptions } from '@/types/component'

const component: ComponentInfo = {
  component: 'Switch1',
  group: ComponentGroup.SWITCH,
  label: '开关1',
  propValue: {
    dataTag: 'ZJGD_2357#ZJGD',
    history: '',
    on: 1,
    off: 0,
    operation: true,
    optUrl: '',
    optTagName: ''
  },
  icon: 'wenben',
  style: {
    width: 35,
    height: 50
  }
}

const style: Array<GroupType> = []

const attrs: Array<GroupType> = [
  {
    name: '数据配置',
    uid: 'data',
    children: [
      {
        key: 'dataTag',
        label: '标签',
        type: 'text'
      },
      {
        key: 'history',
        label: '历史数据',
        type: 'text'
      },
      {
        key: 'on',
        label: '打开数据',
        type: 'number'
      },
      {
        key: 'off',
        label: '关闭数据',
        type: 'number'
      },
      {
        key: 'operation',
        label: '是否可操作',
        type: 'switch'
      },
      {
        key: 'optUrl',
        label: '操作URL',
        type: 'text'
      },
      {
        key: 'optTagName',
        label: '发送的点位名称',
        type: 'text'
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
