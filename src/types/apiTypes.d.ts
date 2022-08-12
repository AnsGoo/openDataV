import type { CanvasStyleData } from '@/types/storeTypes'
import { BaseComponent } from '@/resource/models'

export interface ComponentData {
  canvasStyle: CanvasStyleData
  canvasData: BaseComponent[]
}

export interface LayoutData {
  id?: string
  name?: string
  thumbnail?: string
  author?: string
  createTime?: string
  isHome?: boolean
  canvasData: BaseComponent[]
  canvasStyle: CanvasStyleData
  allowed?: string | null
}

export interface BasicFetchResult<T = any> {
  ErrorCode?: number
  Results: T
  Message?: string
  [key: string]: any
}
