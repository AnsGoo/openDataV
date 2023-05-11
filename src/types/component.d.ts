import type { Component, ConcreteComponent, VNode } from 'vue'

import type { ComponentGroup, FormType, ScriptType } from '@/enum'
import type { DataIntegrationMode, DataType, RequestOptions } from '@/models/requestOption'
import type { CanvasStyleData } from '@/types/storeTypes'

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

export type FormItemComponentProps =
  | InputFormSchema
  | InputNumberFormSchema
  | CustomFormSchema
  | ArrayFormSchema
  | BaseFormSchema
  | SwitchFormSchema
  | SelectFormSchema
  | RadioFormSchema
  | ModalFormSchema
export interface AttrType {
  prop: string
  label: string
  type?: FormType
  showLabel?: boolean
  componentOptions: FormItemComponentProps
  help?: string
}

// 分组类型
export interface PropsType {
  label: string
  prop: string
  type?: FormType
  showLabel?: boolean
  componentOptions?:
    | InputFormSchema
    | InputNumberFormSchema
    | CustomFormSchema
    | ArrayFormSchema
    | BaseFormSchema
    | SwitchFormSchema
    | SelectFormSchema
    | RadioFormSchema
    | ModalFormSchema
  help?: string
  children?: PropsType[]
}

export interface ComponentData {
  canvasStyle: CanvasStyleData
  canvasData: Record<string, any>[]
}

export interface ComponentRequestDataType {
  type: DataType
  otherConfig: Recordable
  requestOptions?: RequestOptions
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
  data?: ComponentRequestDataType
  dataIntegrationMode: DataIntegrationMode
}

export interface ComponentType extends Pick<ComponentDataType, 'component' | 'name' | 'icon'> {
  group: ComponentGroup
  id?: string
  width?: number
  height?: number
  dataIntegrationMode?: DataIntegrationMode
}

export interface AfterScript {
  code: string
  type: ScriptType
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
