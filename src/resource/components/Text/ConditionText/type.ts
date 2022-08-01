export interface Condition {
  symbol: string
  displayType: 'symbol' | 'text' | 'image'
  displayContext: string
  value: string
  color?: string
  fontSize?: number
  iconFit?: 'contain' | 'cover'
}

export interface ConditionText {
  history: string
  tagName: string
  condition: Condition[]
}
