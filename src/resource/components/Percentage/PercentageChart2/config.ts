import { ComponentGroup, FormType } from '@/enum'
import type { ComponentConfig, PropsType, ComponentOptions } from '@/types/component'
import type { PercentageChart } from './type'

const component: ComponentConfig<PercentageChart> = {
  component: 'PercentageChart2',
  label: '百分比图2',
  group: ComponentGroup.PIE,
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

const style: Array<PropsType> = []

const attrs: Array<PropsType> = [
  {
    name: '样式',
    uid: 'style',
    children: [
      {
        key: 'fontSize',
        label: '字体大小',
        type: FormType.TEXT
      },
      {
        key: 'lineLength',
        label: '分割线长度',
        type: FormType.NUMBER
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
        type: FormType.TEXT
      },
      {
        key: 'interval',
        label: '更新间隔',
        type: FormType.NUMBER
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
