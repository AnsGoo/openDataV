import type { ComponentInfo, DOMRectStyle } from '@/types/component'
import { StoreComponentData } from '@/utils/db'

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
  componentData: Array<ComponentInfo>
  curComponent: ComponentInfo | undefined
  isClickComponent: boolean
  isShowEm: boolean
  layerComponent: ComponentInfo | undefined
  ids: Set<string>
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
  snapshotMax: number
  latestSnapshot?: StoreComponentData
  timeHandler?: TimeoutHandle
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
