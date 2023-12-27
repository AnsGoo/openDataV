import type { VNode } from 'vue'

export interface MenuOption {
  label: () => string | VNode
  key: string
  icon?: () => string | VNode
  children?: MenuOption[]
  disabled?: boolean
  childHeight?: number // 用于微调下拉高度,仅在mode为vertical时
}
