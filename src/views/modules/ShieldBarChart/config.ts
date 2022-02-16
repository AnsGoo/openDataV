import { ComponentGroup } from '@/enum'
import type { ComponentInfo, GroupType, ComponentOptions } from '@/types/component'

const component: ComponentInfo = {
  component: 'ShieldBarChart',
  label: '支架柱状图',
  group: ComponentGroup.CUSTOM,
  propValue: {
    title: '标题',
    subTitle: '子标题',
    total: 175,
    history: 'https://data.com',
    subtag: 'YYZJ_[1-9]#ZJYL',
    highflag: 400,
    lowflag: 252,
    upperLimit: 600,
    lowerLimit: 0
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
    name: '数据配置',
    uid: 'data',
    children: [
      {
        key: 'total',
        label: '支架总数',
        type: 'number'
      },
      {
        key: 'history',
        label: '历史数据地址',
        type: 'text'
      },
      {
        key: 'subtag',
        label: '实时数据订阅标签',
        type: 'text'
      },
      {
        key: 'highflag',
        label: '最大报警线',
        type: 'number'
      },
      {
        key: 'lowflag',
        label: '最小报警线',
        type: 'number'
      },
      {
        key: 'upperLimit',
        label: '上限',
        type: 'number'
      },
      {
        key: 'lowerLimit',
        label: '下限',
        type: 'number'
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
