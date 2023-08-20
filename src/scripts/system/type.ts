import type { FormItemProps, FormType } from 'open-data-v/models'
import type { ConcreteComponent } from 'vue'

export interface ScriptForm {
  label: string
  prop: string
  type?: FormType
  component?: string | ConcreteComponent
  props?: FormItemProps
}
