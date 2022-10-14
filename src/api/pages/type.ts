import { ComponentDataType } from '@/types/component'
import type { CanvasStyleData } from '@/types/storeTypes'

export interface LayoutData {
  id?: string
  name?: string
  thumbnail?: string
  author?: string
  createTime?: string
  isHome?: boolean
  canvasData: ComponentDataType[]
  canvasStyle: CanvasStyleData
  allowed?: string | null
}

export type SimpleLayoutData = Omit<LayoutData, 'canvasStyle' | 'canvasData'>
