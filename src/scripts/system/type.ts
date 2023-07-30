import type { ConcreteComponent } from 'vue'

import type { FormItemProps } from '@/designer/type'
import type { FormType } from '@/enum'

export interface ScriptForm {
  label: string
  prop: string
  type?: FormType
  component?: string | ConcreteComponent
  props?: FormItemProps
}
