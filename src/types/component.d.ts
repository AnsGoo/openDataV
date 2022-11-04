import type { FormType, ComponentGroup, ScriptType } from '@/enum'
import type { CanvasStyleData } from '@/types/storeTypes'
import type { DataIntegrationMode } from '@/resource/models/data'
import type { DataType, StaticRequestOptions, RestRequestOptions } from '@/resource/models/data'
import type { Component, ConcreteComponent, VNode } from 'vue'

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
}

export interface SelectFormSchema extends BaseFormSchema {
  options: Array<{ label: string; value: string | number }>
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

export interface AttrType {
  prop: string
  label: string
  type?: FormType
  showLabel?: boolean
  componentOptions:
    | InputFormSchema
    | InputNumberFormSchema
    | CustomFormSchema
    | ArrayFormSchema
    | BaseFormSchema
    | SwitchFormSchema
    | SelectFormSchema
    | RadioFormSchema
  help?: string
}

// 分组类型
export interface PropsType {
  label: string
  prop: string
  children: AttrType[]
}

export interface ComponentData {
  canvasStyle: CanvasStyleData
  canvasData: Record<string, any>[]
}

export interface ComponentRequestDataType {
  type: DataType
  otherConfig: Recordable
  requestOptions?: StaticRequestOptions | RestRequestOptions
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
