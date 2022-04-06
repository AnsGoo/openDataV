import { ComponentGroup } from '@/enum'
import type { ComponentConfig, GroupType, ComponentOptions } from '@/types/component'

const component: ComponentConfig = {
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

const style: Array<GroupType> = [
  {
    name: '边框设置',
    uid: 'border',
    children: [
      {
        key: 'borderWidth',
        label: '边框宽度',
        type: 'number'
      },
      {
        key: 'borderStyle',
        label: '边框风格',
        type: 'select',
        selectOptions: []
      },
      {
        key: 'borderColor',
        label: '边框颜色',
        type: 'color'
      },
      {
        key: 'borderRadius',
        label: '圆角半径',
        type: 'number'
      }
    ]
  }
]

const attrs: Array<GroupType> = [
  {
    name: '标题配置',
    uid: 'title',
    children: [
      {
        key: 'title',
        label: '标题',
        type: 'text'
      },
      {
        key: 'subTitle',
        label: '子标题',
        type: 'text'
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
        type: 'textarea'
      },
      {
        key: 'series',
        label: '数据',
        type: 'textarea'
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
