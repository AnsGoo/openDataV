import { ComponentGroup } from '@/enum'

interface ComponentCommon {
  groupStyle?: Record<string, string | number> // 当一个组件成为 Group 的子组件时使用
  isLock?: boolean // 是否锁定组件
  show?: boolean // 是否显示在控件列表
  group?: ComponentGroup // 组件所属的组
}

interface ComponentStyle {
  [propName: string]: string | number
}

interface DOMRectStyle extends ComponentStyle {
  width: number
  height: number
  left: number
  top: number
  rotate: number
  bottom: number
}

interface ComponentInfo<T = Recordable<string | number | any>> extends ComponentCommon {
  id?: number | string
  component: string
  label?: string
  propValue?: T
  icon?: string
  style: ComponentStyle
  subComponents?: Array<ComponentInfo>
}

interface ArrayType {
  key: string
  type: string
  selectOptions?: Array<{ value: string; label: string }>
  max?: number
}

interface AttrType {
  key: string
  label: string
  type?: string
  selectOptions?: Array<{ value: string; label: string }>
  arrayAttr?: ArrayType
}

// 分组类型
interface GroupType {
  name: string
  uid: string
  max?: number
  children: AttrType[]
}

interface ComponentOptions {
  component: ComponentInfo
  style: Array<GroupType>
  attrs: Array<GroupType>
}

export type {
  ComponentInfo,
  ComponentStyle,
  ComponentOptions,
  GroupType,
  AttrType,
  ArrayType,
  ComponentCommon,
  DOMRectStyle
}
