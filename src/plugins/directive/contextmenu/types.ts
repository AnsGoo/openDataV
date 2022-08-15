export interface ContextmenuItem {
  text?: string
  subText?: string
  divider?: boolean
  disable?: boolean
  hide?: boolean
  children?: ContextmenuItem[]
  handler?: (el: HTMLElement, e: MouseEvent) => void
}

export interface Axis {
  x: number
  y: number
}
