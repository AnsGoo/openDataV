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
      }
    ]
  }
]

export const commonAttr: Array<GroupType> = []

export const commonComponent: ComponentCommon = {
  groupStyle: {}, // 当一个组件成为 Group 的子组件时使用
  isLock: false, // 是否锁定组件
  show: true,
  group: ComponentGroup.OTHER
}
