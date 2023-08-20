import type { CanvasStyleData, ComponentDataType } from 'open-data-v'

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
