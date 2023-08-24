import type { ConcreteComponent, VNode } from 'vue'

import type { CustomComponent } from './component'
import type { ComponentGroup, ContainerType, DataMode, FormType } from './enums'

export type DataAcceptor = (result: any, id?: string) => void

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
export interface GroupStyle {
  gwidth: number
  gheight: number
  gleft: number
  gtop: number
  grotate: number
}
export interface DataInstance {
  toJSON: () => any | undefined
  connect: (dataAcceptor: DataAcceptor) => void
  close?: () => void
}
export interface Response {
  status: 'SUCCESS' | 'FAILED'
  data: any
}

export interface ScriptOption {
  type: string
  key: string
  [extra: string]: any
}

export interface BaseScript {
  type: string
  key: string
  toJSON: () => ScriptOption | undefined
  afterCallback?: (data: any, propValue: Record<string, any>) => any
}

export interface BaseFormProps {
  editable?: boolean
  disabled?: boolean
  required?: boolean
  defaultValue: string | number | boolean | any
  placeholder?: string
}

export interface InputProps extends BaseFormProps {
  prefix?: () => VNode
  suffix?: () => VNode
}

export interface InputNumberProps extends BaseFormProps {
  min: number
  max: number
  step: number
  prefix?: () => VNode
  suffix?: () => VNode
  precision?: number
}

export interface SelectProps extends BaseFormProps {
  options: Array<{ label: string; value: string | number }>
}

export interface ModalProps extends BaseFormProps {
  context: any
  buttonText: string
  size: 'small'
  bordered: boolean
}
export type RadioProps = SelectProps
export type SwitchProps = SelectProps

export interface CustomProps extends BaseFormProps {
  componentType: string | ConcreteComponent
  args: any
}

export interface ArrayProps extends BaseFormProps {
  count: number
  type: 'static' | 'dynamic'
  maxItem?: number
  minItem?: number
}

export interface CollapseProps {
  accordion?: boolean
}

export interface TabsProps {
  type?: 'bar' | 'line' | 'card' | 'segment'
  justifyContent?: 'space-between' | 'space-around' | 'space-evenly' | 'start' | 'center' | 'end'
  prefix?: () => VNode
  suffix?: () => VNode
}

export interface FormProps {
  labelPlacement?: 'left' | 'top'
  labelWidth?: number | string | 'auto'
}
export interface RequestOptions<T = any> {
  options: T
  type: string
}

export interface DataOption {
  type: string
  otherConfig?: Record<string, any>
  requestOptions: RequestOptions
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
  /**
   * deprecated: 即将废弃，请使用 dataMode 属性
   */
  dataIntegrationMode?: DataMode
}
interface CustomContainerProps {
  componentType: string | ConcreteComponent
  args: any
}

export type ContainerItemProps = CollapseProps | TabsProps | FormProps | CustomContainerProps
export type FormItemProps =
  | InputProps
  | InputNumberProps
  | CustomProps
  | ArrayProps
  | BaseFormProps
  | SwitchProps
  | SelectProps
  | RadioProps
  | ModalProps

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
export type BaseComponent = { new (id?: string, name?: string, icon?: string): CustomComponent }

export interface ResponseData<T = any> extends Response {
  afterData: T
}
