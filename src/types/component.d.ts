import { FormType, ComponentGroup } from '@/enum'

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

interface ArrayFormSchema extends BaseFormSchema {
  max: number
  type: 'static' | 'dynamic'
}

interface AttrType {
  prop: string
  label: string
  type?: FormType
  componentOptions:
    | InputFormSchema
    | InputNumberFormSchema
    | CustomFormSchema
    | ArrayFormSchema
    | BaseFormSchema
  help?: string
}

// 分组类型
interface PropsType {
  label: string
  prop: string
  children: AttrType[]
}

export interface ComponentDataType {
  id: string
  name: string
  component: string
  groupStyle?: GroupStyle
  icon?: string
  style: Record<string, string | number | boolean>
  propValue: Record<string, any>
  subComponents: ComponentDataType[]
}

export interface ComponentType extends Pick<ComponentDataType, 'component' | 'name' | 'icon'> {
  group: ComponentGroup
  id?: string
  width?: number
  height?: number
}

export type {
  ComponentStyle,
  ComponentType,
  PropsType,
  AttrType,
  DOMRectStyle,
  GroupStyle,
  CustomFormSchema,
  InputNumberFormSchema
}
