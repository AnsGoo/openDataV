import type { ComponentInfo, GroupType, ComponentOptions } from '@/types/component'

const component: ComponentInfo = {
  component: 'ColorfullHistogramH',
  label: '横向刻度表',
  propValue: {
    history: 'https://data.com',
    dataTag: 'ZJGD_2212#ZJGD',
    name: '温度',
    unit: '℃',
    normal: 80,
    warning: 90,
    alarm: 100,
    total: 100,
    value: 60
  },
  style: {
    width: 800,
    height: 100
  }
}
const style: Array<GroupType> = []

const attrs: Array<GroupType> = [
  {
    name: '基本配置',
    uid: 'basic',
    children: [
      {
        key: 'name',
        label: '名称',
        type: 'text'
      },
      {
        key: 'currValue',
        label: '当前值',
        type: 'number'
      },
      {
        key: 'unit',
        label: '单位',
        type: 'text'
      }
    ]
  },
  {
    name: '数据项配置',
    uid: 'datas',
    children: [
      {
        key: 'history',
        label: '历史数据接口',
        type: 'text'
      },
      {
        key: 'datatag',
        label: '对应path点',
        type: 'text'
      },
      {
        key: 'total',
        label: '最大刻度值',
        type: 'number'
      },
      {
        key: 'normal',
        label: '正常值',
        type: 'text'
      },
      {
        key: 'warning',
        label: '预警值',
        type: 'number'
      },
      {
        key: 'alarm',
        label: '报警值',
        type: 'text'
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
