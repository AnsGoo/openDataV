import type { DOMRectStyle } from '@/types/component'
import { StoreComponentData } from '@/utils/db'
import { BaseComponent } from '@/resource/models'

export interface Component {
  style: Recordable<string>
}

export interface CanvasStyleData {
  width: number
  height: number
  scale: number
  image: string
}

export interface EditData {
  name: string
  thumbnail: string
  editMode: string
  canvasStyleData: CanvasStyleData
  componentData: BaseComponent[]
  activeIndex?: string
  curComponent: Optional<BaseComponent>
  isClickComponent: boolean
  isShowEm: boolean
  ids: Set<string>
  benchmarkComponent: Optional<BaseComponent>
}

export interface MenuStatus {
  menuTop: number
  menuLeft: number
  menuShow?: boolean
}

export interface CopyItem {
  copyData: Optional<BaseComponent>
  isCut: boolean
}

export interface SnapData {
  snapshotMax: number
  latestSnapshot?: StoreComponentData
  timeHandler?: TimeoutHandle
  cursor: number
}

export interface AreaData {
  style: DOMRectStyle
  components: BaseComponent[]
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
