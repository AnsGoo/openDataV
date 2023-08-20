import type {
  ComponentGroup,
  ContainerType,
  DataMode,
  DataType,
  FormType,
  RequestOptions
} from 'open-data-v/base'
import type { Component, ConcreteComponent, VNode } from 'vue'

import type { CanvasStyleData } from './state/type'

export interface Vector {
  x: number
  y: number
}

export interface DOMRectStyle {
  width: number
  height: number
  left: number
  top: number
  rotate: number
}

export type Position = Omit<DOMRectStyle, 'rotate'>

export interface Location {
  right: number
  left: number
  top: number
  bottom: number
}

export interface GroupStyle {
  gwidth: number
  gheight: number
  gleft: number
  gtop: number
  grotate: number
}

export interface DOMRectStyle {
  width: number
  height: number
  left: number
  top: number
  rotate: number
}

export interface ComponentStyle extends DOMRectStyle {
  [propName: string]: string | number | boolean
}

export interface BaseFormSchema {
  editable?: boolean
  disabled?: boolean
  required?: boolean
  defaultValue: string | number | boolean | any
  placeholder?: string
}

export interface InputFormSchema extends BaseFormSchema {
  prefix?: () => VNode
  suffix?: () => VNode
}

export interface InputNumberFormSchema extends BaseFormSchema {
  min: number
  max: number
  step: number
  prefix?: () => VNode
  suffix?: () => VNode
  precision?: number
}

export interface SelectFormSchema extends BaseFormSchema {
  options: Array<{ label: string; value: string | number }>
}

export interface ModalFormSchema extends BaseFormSchema {
  context: any
  buttonText: string
  size: 'small'
  bordered: boolean
}
export type RadioFormSchema = SelectFormSchema
export type SwitchFormSchema = SelectFormSchema

export interface CustomFormSchema extends BaseFormSchema {
  componentType: string | ConcreteComponent
  args: any
}

interface ArrayFormSchema extends BaseFormSchema {
  count: number
  type: 'static' | 'dynamic'
  maxItem?: number
  minItem?: number
}

interface CollapseProps {
  accordion?: boolean
}

interface TabsProps {
  type?: 'bar' | 'line' | 'card' | 'segment'
  justifyContent?: 'space-between' | 'space-around' | 'space-evenly' | 'start' | 'center' | 'end'
  prefix?: () => VNode
  suffix?: () => VNode
}

interface FormProps {
  labelPlacement?: 'left' | 'top'
  labelWidth?: number | string | 'auto'
}

interface CustomContainerProps {
  componentType: string | ConcreteComponent
  args: any
}

export type ContainerItemProps = CollapseProps | TabsProps | FormProps | CustomContainerProps
export type FormItemProps =
  | InputFormSchema
  | InputNumberFormSchema
  | CustomFormSchema
  | ArrayFormSchema
  | BaseFormSchema
  | SwitchFormSchema
  | SelectFormSchema
  | RadioFormSchema
  | ModalFormSchema

export interface MetaForm {
  label: string
  prop: string
  type?: FormType
  component?: string | ConcreteComponent
  showLabel?: boolean
  /**
   * @deprecated componentOptions即将弃用，建议使用props
   */
  componentOptions?: FormItemProps
  props?: FormItemProps
  children?: MetaForm[]
}

export interface MetaContainerItem {
  label: string
  prop: string
  showLabel?: boolean
  type?: ContainerType
  component?: string | ConcreteComponent
  /**
   * @deprecated componentOptions即将弃用，建议使用props
   */
  componentOptions?: ContainerItemProps
  props?: ContainerItemProps
  children: MetaForm[]
}

/**
 * @deprecated PropsType 类型即将废弃，建议使用 MetaContainerItem
 */
export type PropsType = MetaContainerItem

export interface ComponentData {
  canvasStyle: CanvasStyleData
  canvasData: Record<string, any>[]
  dataSlotters: Array<{ type: string; config: any }>
}

export interface DataOption {
  type: DataType
  otherConfig?: Record<string, any>
  requestOptions: RequestOptions
}

export interface ScriptOption {
  type: string
  key: string
  [extra: string]: any
}
export interface ComponentDataType {
  id: string
  name: string
  component: string
  groupStyle?: GroupStyle
  icon?: string
  style: Record<string, string | number | boolean>
  propValue: Record<string, any>
  subComponents?: ComponentDataType[]
  data?: DataOption
  dataMode: DataMode
  script?: ScriptOption
}

export interface ComponentType extends Pick<ComponentDataType, 'component' | 'name' | 'icon'> {
  group: ComponentGroup
  id?: string
  width?: number
  height?: number
  dataMode?: DataMode
}
export interface ComponentItem {
  label: string
  icon: string
  key: string
  children: Array<{
    label: string
    key: string
    docs?: Component
  }>
}
