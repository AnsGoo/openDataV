import type { RendererElement, RendererNode, VNode } from 'vue'

export type IconNode = () => VNode<
  RendererNode,
  RendererElement,
  {
    [key: string]: any
  }
>
export interface ToolBarItemType {
  label: string
  action: (e: MouseEvent, ...others: any) => void
  disable?: (e: MouseEvent) => void
  icon: string | IconNode
  divider?: boolean
  // 不填默认为left
  location?: 'left' | 'right' | 'middle'
  children?: ToolBarItemType[]
}
