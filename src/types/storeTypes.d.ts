import type { ContainerType, EditMode } from '@/enum'
import type { CustomComponent } from '@/models'
import type { Position } from '@/types/common'
import type { MetaContainerItem } from '@/types/component'
import type { StoreComponentData } from '@/utils/db'

export interface CanvasStyleData {
  width: number
  height: number
  background: any
  extraAttrs?: any
}

export interface CanvasStyleConfig {
  formItems?: Array<MetaContainerItem>
  mode?: ContainerType
}

export interface EditData {
  name: string
  thumbnail: string
  editMode: EditMode
  canvasStyleData: CanvasStyleData
  componentData: CustomComponent[]
  activeIndex?: string
  curComponent: Optional<CustomComponent>
  isClickComponent: boolean
  isShowEm: boolean
  ids: Set<string>
  benchmarkComponent: Optional<CustomComponent>
  scale: number
  canvasStyleConfig: CanvasStyleConfig
  globalData: Array<any>
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
  style: Position
  components: CustomComponent[]
  ids: Set
}

export interface UserInfo {
  username: string
  token: string | undefined
}
