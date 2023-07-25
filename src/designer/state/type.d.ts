import type { StoreComponentData } from '@/designer/db'
import type { DataSlotter } from '@/designer/state/slotter'
import type { MetaContainerItem, Position } from '@/designer/type'
import type { ContainerType, EditMode } from '@/enum'
import type { CustomComponent } from '@/models'

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
export interface CanvasData {
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
  globalSlotters: Record<string, DataSlotter>
}

export interface SnapData {
  snapshotMax: number
  latestSnapshot?: StoreComponentData
  timeHandler?: TimeoutHandle
  cursor: number
}

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

export interface CopyItem {
  copyData: Optional<CustomComponent>
  isCut: boolean
}
export interface SelectedAreaData {
  style: Position
  components: CustomComponent[]
  ids: Set
}
