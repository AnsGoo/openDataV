import type { ContextmenuItem } from './plugins/directive'
import type { CanvasStyleData } from './state'

export interface Location {
  top: number
  left: number
  right: number
  bottom: number
}

export interface RelativePosition {
  gwidth: number
  gheight: number
  gleft: number
  gtop: number
  grotate: number
}

export interface ComponentData {
  canvasStyle: CanvasStyleData
  canvasData: Record<string, any>[]
  dataSlotters: Array<{ type: string; config: any }>
}

export type { ContextmenuItem }
