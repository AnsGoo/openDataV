import type { StoreComponentData } from '@/utils/db'
import type { BaseComponent } from '@/resource/models'

export interface CanvasStyleData {
  width: number
  height: number
  background: any
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
  scale: number
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
  style: Postion
  components: BaseComponent[]
  ids: Set
}

export interface UserInfo {
  username: string
  token: string | undefined
}
