import type { FormItemProps } from 'open-data-v/designer/type'
import type { FormType } from 'open-data-v/enum'
import type { ConcreteComponent } from 'vue'

export interface ScriptForm {
  label: string
  prop: string
  type?: FormType
  component?: string | ConcreteComponent
  props?: FormItemProps
}
