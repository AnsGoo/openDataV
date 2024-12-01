import type { ComponentGroup, DataMode } from '@open-data-v/base'
import type { Component } from 'vue'

import type { ContextmenuItem } from './plugins/directive'
import type { CanvasStyleData } from './state'

export interface Vector {
  x: number
  y: number
}

export interface DOMRectStyle {
  width: number
  height: number
  left: number
  top: number
  rotate: number
}

export type Position = Omit<DOMRectStyle, 'rotate'>

export interface Location {
  right: number
  left: number
  top: number
  bottom: number
}

export interface RelativePosition {
  gwidth: number
  gheight: number
  gleft: number
  gtop: number
  grotate: number
}

export interface DOMRectStyle {
  width: number
  height: number
  left: number
  top: number
  rotate: number
}

export interface ComponentData {
  canvasStyle: CanvasStyleData
  canvasData: Record<string, any>[]
  dataSlotters: Array<{ type: string; config: any }>
}

export interface ComponentType extends Pick<ComponentDataType, 'component' | 'name' | 'icon'> {
  group: ComponentGroup
  id?: string
  width?: number
  height?: number
  dataMode?: DataMode
}
export interface ComponentItem {
  label: string
  icon: string
  key: string
  children: Array<{
    label: string
    key: string
    docs?: Component
  }>
}

export type { ContextmenuItem }
