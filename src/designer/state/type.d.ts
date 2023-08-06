import type { EditMode } from 'open-data-v/designer/const'
import type { StoreComponentData } from 'open-data-v/designer/db'
import type { ContainerType } from 'open-data-v/designer/enum'
import type { DataSlotter } from 'open-data-v/designer/state/slotter'
import type { ComponentDataType, MetaContainerItem, Position } from 'open-data-v/designer/type'
import type { BaseComponent, CustomComponent } from 'open-data-v/models'

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
  darkTheme: boolean
  canvasStyleConfig: CanvasStyleConfig
  globalSlotters: Record<string, DataSlotter>
  components: Record<string, BaseComponent>
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

export interface LayoutData {
  name?: string
  thumbnail?: string
  canvasData: ComponentDataType[]
  canvasStyle: CanvasStyleData
  isPublish?: boolean
  dataSlotters: Array<{ type: string; config: any }>
}
