import type { CanvasStyleData } from '@/types/storeTypes'
import type { ComponentInfo } from '@/types/component'

export interface ComponentData {
  canvasStyle: CanvasStyleData
  canvasData: ComponentInfo[]
}

export interface LayoutData {
  id?: string
  name: string
  thumbnail: string
  author?: string
  createTime?: string
  isHome?: boolean
  canvasData: ComponentInfo[]
  canvasStyle: CanvasStyleData
  allowed?: string | null
}

export interface BasicFetchResult<T = any> {
  ErrorCode?: number
  Results: T
  Message?: string
  [key: string]: any
}

export interface Setting {
  id?: string | number
  name: string
  tag: string
  config: Recordable
  desc?: string
}
