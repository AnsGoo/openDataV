import { ComponentGroup } from '@/enum'
import type { ComponentConfig, GroupType, ComponentOptions } from '@/types/component'

const component: ComponentConfig = {
  component: 'Thermometer1',
  label: '温度计1',
  group: ComponentGroup.Thermometer,
  propValue: {
    history: 'https://data.com',
    datatag: 'ZJGD_2212#ZJGD',
    maxValue: 150,
    splitNumber: 10
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
    name: '数据配置',
    uid: 'data',
    children: [
      {
        key: 'history',
        label: '历史数据地址',
        type: 'text'
      },
      {
        key: 'datatag',
        label: '数据标签',
        type: 'text'
      },
      {
        key: 'maxValue',
        label: '最大值',
        type: 'number'
      },
      {
        key: 'splitNumber',
        label: '间隔',
        type: 'number'
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
