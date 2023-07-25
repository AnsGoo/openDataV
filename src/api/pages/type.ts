import type { CanvasStyleData } from '@/designer/state/type'
import type { ComponentDataType } from '@/designer/type'

export interface LayoutData {
  id?: string
  name?: string
  thumbnail?: string
  author?: string
  createTime?: string
  isHome?: boolean
  canvasData: ComponentDataType[]
  canvasStyle: CanvasStyleData
  isPublish?: boolean
  dataSlotters: Array<{ type: string; config: any }>
}

export type SimpleLayoutData = Omit<LayoutData, 'canvasStyle' | 'canvasData'>
