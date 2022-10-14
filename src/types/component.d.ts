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
  componentType: string | ConcreteComponent
  args: any
}

interface ArrayFormSchema extends BaseFormSchema {
  count: number
  type: 'static' | 'dynamic'
}

interface AttrType {
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
  help?: string
}

// 分组类型
interface PropsType {
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
  requestOptions: StaticRequestOptions | RestRequestOptions
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
