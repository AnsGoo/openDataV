import type { BaseComponent, CustomComponent } from 'open-data-v/base'
import type {
  ComponentDataType,
  ContainerType,
  DataSlotter,
  EditMode,
  MetaContainerItem,
  Position,
  StoreComponentData
} from 'open-data-v/designer'

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
