import { ComponentGroup } from '@/enum'

interface GroupStyle {
  gwidth: number
  gheight: number
  gleft: number
  gtop: number
  grotate: number
}

interface ComponentCommon {
  groupStyle?: GroupStyle // 当一个组件成为 Group 的子组件时使用
  isLock?: boolean // 是否锁定组件
  show?: boolean // 是否显示在控件列表
  group?: ComponentGroup // 组件所属的组
  display: boolean
}

interface Rect {
  left: number
  top: number
  right: number
  bottom: number
}
interface DOMRectStyle {
  width: number
  height: number
  left: number
  top: number
  rotate: number
}

interface ComponentStyle extends DOMRectStyle {
  [propName: string]: string | number
}

interface ComponentInfo<T = Recordable<string | number | any>> extends ComponentCommon {
  id: string
  component: string
  label: string
  propValue?: T
  icon: string
  style: ComponentStyle
  subComponents?: Array<ComponentInfo>
}

interface ComponentConfig<T = Recordable<string | number | any>> {
  component: string
  label: string
  propValue: T
  icon: string
  group: ComponentGroup
  style: Recordable<any>
  show?: boolean | undefined
}

interface ArrayAttrType {
  key: string
  type: string
  componentOptions?: any
  max?: number
}

interface AttrType {
  key: string
  label: string
  type?: string
  componentOptions?: any
  arrayAttr?: ArrayAttrType
  help?: string
}

// 分组类型
interface PropsType {
  name: string
  uid: string
  max?: number
  children: AttrType[]
}

interface ComponentOptions {
  component: ComponentConfig
  style: Array<PropsType>
  attrs: Array<PropsType>
}

export type {
  ComponentInfo,
  ComponentStyle,
  ComponentOptions,
  PropsType,
  AttrType,
  ArrayAttrType,
  ComponentCommon,
  DOMRectStyle,
  GroupStyle,
  Rect,
  ComponentConfig
}
