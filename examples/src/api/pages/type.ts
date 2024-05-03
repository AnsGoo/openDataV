import type { ComponentDataType } from '@open-data-v/base'
import type { CanvasStyleData } from '@open-data-v/designer'

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
  components?: Array<string>
}

export type SimpleLayoutData = Omit<LayoutData, 'canvasStyle' | 'canvasData'>
