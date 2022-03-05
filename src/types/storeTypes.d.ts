import type { ComponentInfo, DOMRectStyle } from '@/types/component'

export interface Component {
  style: Recordable<string>
}

export interface CanvasStyleData {
  width: number
  height: number
  scale: number
  dataWs: string
  image: string
}

export interface EditData {
  name: string
  thumbnail: string
  editMode: string
  canvasStyleData: CanvasStyleData
  componentData: Array<any>
  curComponent: ComponentInfo | undefined
  curComponentIndex: number | undefined
  isClickComponent: boolean
  isShowEm: boolean
  layerComponent: ComponentInfo | undefined
}

export interface MenuStatus {
  menuTop: number
  menuLeft: number
  menuShow?: boolean
}

export interface CopyItem {
  copyData: any | undefined
  isCut: boolean
}

export interface SnapData {
  snapshotData: Array<any>
  snapshotMax: number
}

export interface AreaData {
  style: DOMRectStyle
  components: Array<ComponentInfo>
}

export interface UserInfo {
  username: string
  token: string | undefined
  permissions: string[]
}

export interface Postion {
  width?: number
  height?: number
  left?: number
  top?: number
  rotate?: number
}
