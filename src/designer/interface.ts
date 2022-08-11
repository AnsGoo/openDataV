import { ComponentGroup, FormType } from '@/enum'
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
        type: FormType.NUMBER
      },
      {
        key: 'top',
        label: 'y 坐标',
        type: FormType.NUMBER
      },
      {
        key: 'width',
        label: '宽',
        type: FormType.NUMBER
      },
      {
        key: 'height',
        label: '高',
        type: FormType.NUMBER
      },
      {
        key: 'rotate',
        label: '旋转角度',
        type: FormType.NUMBER
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
      type: FormType.NUMBER
    },
    {
      key: 'gtop',
      label: '相对坐标y',
      type: FormType.NUMBER
    },
    {
      key: 'gwidth',
      label: '相对宽度',
      type: FormType.NUMBER
    },
    {
      key: 'gheight',
      label: '相对高度',
      type: FormType.NUMBER
    },
    {
      key: 'grotate',
      label: '旋转角度',
      type: FormType.NUMBER
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
