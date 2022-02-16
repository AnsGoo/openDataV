import { ComponentGroup } from '@/enum'
import type { ComponentInfo, GroupType, ComponentOptions } from '@/types/component'

const component: ComponentInfo = {
  component: 'PercentageChart2',
  label: '百分比图2',
  group: ComponentGroup.PERCENTAGE,
  propValue: {
    title: '标题',
    history: 'https://data.com',
    interval: 3000,
    fontSize: 20,
    lineLength: 200
  },
  icon: 'wenben',
  style: {
    width: 300,
    height: 300
  }
}

const style: Array<GroupType> = []

const attrs: Array<GroupType> = [
  {
    name: '样式',
    uid: 'style',
    children: [
      {
        key: 'fontSize',
        label: '字体大小',
        type: 'text'
      },
      {
        key: 'lineLength',
        label: '分割线长度',
        type: 'number'
      }
    ]
  },
  {
    name: '数据配置',
    uid: 'data',
    children: [
      {
        key: 'history',
        label: '历史数据地址',
        type: 'text'
      },
      {
        key: 'interval',
        label: '更新间隔',
        type: 'number'
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
