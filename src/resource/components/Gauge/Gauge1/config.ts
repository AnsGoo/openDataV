import { ComponentGroup, FormType } from '@/enum'
import type { ComponentConfig, PropsType, ComponentOptions } from '@/types/component'
import type { GaugeOne } from './type'

const component: ComponentConfig<GaugeOne> = {
  component: 'Gauge1',
  label: '仪表盘1',
  group: ComponentGroup.GAUGE,
  propValue: {
    name: '电压',
    value: 220,
    history: 'https://data.com',
    datatag: 'ZJGD_2212#ZJGD',
    unit: 'V',
    maxValue: 600
  },
  icon: 'wenben',
  style: {
    width: 300,
    height: 300
  }
}

const style: Array<PropsType> = []

const attrs: Array<PropsType> = [
  {
    name: '数据配置',
    uid: 'data',
    children: [
      {
        key: 'name',
        label: '名称',
        type: FormType.TEXT
      },
      {
        key: 'history',
        label: '历史数据地址',
        type: FormType.TEXT
      },
      {
        key: 'datatag',
        label: '数据标签',
        type: FormType.TEXT
      },
      {
        key: 'unit',
        label: '单位',
        type: FormType.TEXT
      },
      {
        key: 'maxValue',
        label: '最大值',
        type: FormType.NUMBER
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
