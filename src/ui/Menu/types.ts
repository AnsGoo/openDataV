import type { VNode } from 'vue'

export interface Items {
  label?: () => string | VNode
  key: string
  icon?: string
  children?: Items[]
  disabled?: boolean
  childHeight?: number // 用于微调下拉高度,仅在mode为vertical时
}
