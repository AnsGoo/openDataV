import { ComponentGroup } from '@/enum'
import type { ComponentInfo, GroupType, ComponentOptions } from '@/types/component'

export interface PropValueType {
  url: string
  interval: number
  unit: 'd' | 'h' | 'm'
  max: number
  min: number
}

const component: ComponentInfo<PropValueType> = {
  component: 'Line3DChart',
  group: ComponentGroup.LINE,
  label: '3D矿压图',
  propValue: {
    url: 'http://192.168.10.111:3000/caches',
    interval: 1,
    unit: 'd',
    max: 400,
    min: 0
  },
  icon: 'line',
  style: {
    width: 500,
    height: 400
  }
}

const style: Array<GroupType> = []

const attrs: Array<GroupType> = [
  {
    name: '数据配置',
    uid: 'data',
    children: [
      {
        key: 'url',
        label: '请求地址',
        type: 'text'
      },
      {
        key: 'interval',
        label: '时间跨度',
        type: 'number'
      },
      {
        key: 'unit',
        label: '时间跨度单位',
        type: 'select',
        selectOptions: [
          { label: '天', value: 'd' },
          { label: '小时', value: 'h' },
          { label: '分钟', value: 'm' }
        ]
      },
      {
        key: 'max',
        label: '最大值',
        type: 'number'
      },
      {
        key: 'min',
        label: '最小值',
        type: 'number'
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
