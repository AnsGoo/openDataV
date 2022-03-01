import { ComponentGroup } from '@/enum'
import type { GroupType, ComponentCommon } from '@/types/component'

// 公共样式
export const commonStyle: Array<GroupType> = [
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

export const groupCommonStyle: GroupType = {
  name: '基础',
  uid: 'base',
  children: [
    {
      key: 'left',
      label: '相对坐标x',
      type: 'number'
    },
    {
      key: 'top',
      label: '相对坐标y',
      type: 'number'
    },
    {
      key: 'width',
      label: '相对宽度',
      type: 'number'
    },
    {
      key: 'height',
      label: '相对高度',
      type: 'number'
    },
    {
      key: 'rotate',
      label: '旋转角度',
      type: 'number'
    }
  ]
}

export const commonAttr: Array<GroupType> = []

export const commonComponent: ComponentCommon = {
  groupStyle: {}, // 当一个组件成为 Group 的子组件时使用
  isLock: false, // 是否锁定组件
  show: true,
  group: ComponentGroup.OTHER
}
