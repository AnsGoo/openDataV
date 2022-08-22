import { ComponentGroup, FormType } from '@/enum'

interface GroupStyle {
  gwidth: number
  gheight: number
  gleft: number
  gtop: number
  grotate: number
}

interface DOMRectStyle {
  width: number
  height: number
  left: number
  top: number
  rotate: number
}

interface ComponentStyle extends DOMRectStyle {
  [propName: string]: string | number | boolean
}

interface BaseFormSchema {
  editable?: boolean
  disabled?: boolean
  required?: boolean
  defaultValue: string | number | boolean | any
  options?: any
}

type InputFormSchema = BaseFormSchema

interface InputNumberFormSchema extends BaseFormSchema {
  min: number
  max: number
  step: number
}

interface CustomFormSchema extends BaseFormSchema {
  componentType: string
  args: any
}

interface AttrType {
  prop: string
  label: string
  type?: FormType
  componentOptions: InputFormSchema | InputNumberFormSchema | CustomFormSchema | BaseFormSchema
  help?: string
}

// 分组类型
interface PropsType {
  label: string
  prop: string
  children: AttrType[]
}

export type {
  ComponentStyle,
  PropsType,
  AttrType,
  DOMRectStyle,
  GroupStyle,
  ComponentConfig,
  CustomFormSchema
}
