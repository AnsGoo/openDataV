import type { ConcreteComponent } from 'vue'

import type { FormType } from '@/enum'
import type { FormItemProps } from '@/types/component'

export interface ScriptForm {
  label: string
  prop: string
  type?: FormType
  component?: string | ConcreteComponent
  props?: FormItemProps
}
