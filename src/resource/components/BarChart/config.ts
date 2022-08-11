import { ComponentGroup, FormType } from '@/enum'
import type { ComponentConfig, PropsType, ComponentOptions } from '@/types/component'
import type { BarChart } from './type'

const component: ComponentConfig<BarChart> = {
  component: 'BarChart',
  group: ComponentGroup.BAR,
  label: '柱状图',
  propValue: {
    title: '标题',
    subTitle: '子标题',
    xAxis: JSON.stringify(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']),
    series: JSON.stringify([
      [320, 332, 301, 334, 390, 330, 320],
      [120, 132, 101, 134, 90, 230, 210]
    ])
  },
  icon: 'wenben',
  style: {
    width: 300,
    height: 300
  }
}

const style: Array<PropsType> = [
  {
    name: '边框设置',
    uid: 'border',
    children: [
      {
        key: 'borderWidth',
        label: '边框宽度',
        type: FormType.NUMBER
      },
      {
        key: 'borderStyle',
        label: '边框风格',
        type: FormType.SELECT,
        componentOptions: {
          options: []
        }
      },
      {
        key: 'borderColor',
        label: '边框颜色',
        type: FormType.COLOR
      },
      {
        key: 'borderRadius',
        label: '圆角半径',
        type: FormType.NUMBER
      }
    ]
  }
]

const attrs: Array<PropsType> = [
  {
    name: '标题配置',
    uid: 'title',
    children: [
      {
        key: 'title',
        label: '标题',
        type: FormType.TEXT
      },
      {
        key: 'subTitle',
        label: '子标题',
        type: FormType.TEXT
      }
    ]
  },
  {
    name: '静态数据配置',
    uid: 'data',
    children: [
      {
        key: 'xAxis',
        label: '横坐标',
        type: FormType.TEXTAREA
      },
      {
        key: 'series',
        label: '数据',
        type: FormType.TEXTAREA
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions