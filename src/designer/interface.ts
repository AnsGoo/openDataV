import { ComponentGroup } from '@/enum'
import type { PropsType, ComponentCommon } from '@/types/component'

// 公共样式
export const commonStyle: Array<PropsType> = [
  {
    name: '基础',
    uid: 'base',
    children: [
      {
        key: 'left',
        label: 'x 坐标',
        type: 'number'
      },
      {
        key: 'top',
        label: 'y 坐标',
        type: 'number'
      },
      {
        key: 'width',
        label: '宽',
        type: 'number'
      },
      {
        key: 'height',
        label: '高',
        type: 'number'
      },
      {
        key: 'rotate',
        label: '旋转角度',
        type: 'number'
      }
    ]
  }
]

export const groupCommonStyle: PropsType = {
  name: '基础',
  uid: 'base',
  children: [
    {
      key: 'gleft',
      label: '相对坐标x',
      type: 'number'
    },
    {
      key: 'gtop',
      label: '相对坐标y',
      type: 'number'
    },
    {
      key: 'gwidth',
      label: '相对宽度',
      type: 'number'
    },
    {
      key: 'gheight',
      label: '相对高度',
      type: 'number'
    },
    {
      key: 'grotate',
      label: '旋转角度',
      type: 'number'
    }
  ]
}

export const commonAttr: Array<PropsType> = []

export const commonComponent: ComponentCommon = {
  isLock: false, // 是否锁定组件
  show: true,
  group: ComponentGroup.OTHER,
  display: true
}
