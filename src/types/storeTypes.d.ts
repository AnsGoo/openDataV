import type { StoreComponentData } from '@/utils/db'
import type { CustomComponent } from '@/models'

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
  componentData: CustomComponent[]
  activeIndex?: string
  curComponent: Optional<CustomComponent>
  isClickComponent: boolean
  isShowEm: boolean
  ids: Set<string>
  benchmarkComponent: Optional<CustomComponent>
  scale: number
}

export interface MenuStatus {
  menuTop: number
  menuLeft: number
  menuShow?: boolean
}

export interface CopyItem {
  copyData: Optional<CustomComponent>
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
  components: CustomComponent[]
  ids: Set
}

export interface UserInfo {
  username: string
  token: string | undefined
}
