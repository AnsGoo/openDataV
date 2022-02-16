import { ComponentGroup } from '@/enum'
import type { ComponentInfo, GroupType, ComponentOptions } from '@/types/component'

const component: ComponentInfo = {
  component: 'Coal',
  group: ComponentGroup.CUSTOM,
  label: '采煤机',
  propValue: {
    historyUrl: 'https://data.com',
    statusTag: 'CMJ_PSJZT',
    leftDdrumHeightTag: 'CMJ_ZGTGD',
    rightDdrumHeightTag: 'CMJ_YGTGD',
    maxHeight: 3.5,
    minHeight: -0.5
  },
  icon: 'wenben',
  style: {
    width: 150,
    height: 150
  }
}

const style: Array<GroupType> = []

const attrs: Array<GroupType> = [
  {
    name: '数据配置',
    uid: 'title',
    children: [
      {
        key: 'historyUrl',
        label: '历史数据获取地址',
        type: 'text'
      },
      {
        key: 'statusTag',
        label: '运行状态数据标签',
        type: 'text'
      },
      {
        key: 'leftDdrumHeightTag',
        label: '左滚筒高度数据标签',
        type: 'text'
      },
      {
        key: 'rightDdrumHeightTag',
        label: '右滚筒高度数据标签',
        type: 'text'
      },
      {
        key: 'maxHeightg',
        label: '最大高度(m)',
        type: 'number'
      },
      {
        key: 'minHeight',
        label: '最小高度(m)',
        type: 'number'
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
