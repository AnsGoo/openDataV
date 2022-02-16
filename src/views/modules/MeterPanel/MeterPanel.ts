import type { ComponentInfo, GroupType, ComponentOptions } from '@/types/component'

const component: ComponentInfo = {
  component: 'MeterPanel',
  label: '油表图',
  propValue: {
    name: '俯仰角',
    value: 1,
    history: 'https://data.com',
    datatag: 'ZJGD_2212#ZJGD',
    unit: '°',
    maxValue: 10,
    minValue: -10
  },
  icon: 'wenben',
  style: {
    width: 300,
    height: 150
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
        key: 'value',
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
        key: 'unit',
        label: '单位',
        type: 'text'
      },
      {
        key: 'maxValue',
        label: '最大刻度值',
        type: 'number'
      },
      {
        key: 'minValue',
        label: '最小刻度值',
        type: 'number'
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
