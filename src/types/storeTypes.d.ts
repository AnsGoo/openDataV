import { StoreComponentData } from '@/utils/db'
import { BaseComponent } from '@/resource/models'

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
}

export interface UserInfo {
  username: string
  token: string | undefined
  permissions: string[]
}
