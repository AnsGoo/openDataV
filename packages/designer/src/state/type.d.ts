import type { BaseComponent, CustomComponent } from '@open-data-v/base'

import type {
  ContainerType,
  DataSlotter,
  EditMode,
  IComponentData,
  MetaContainerItem,
  Position,
  StoreComponentData
} from '../type'

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
  activeComponent: Optional<CustomComponent>
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
  copyData: Optional<IComponentData>
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
  canvasData: IComponentData[]
  canvasStyle: CanvasStyleData
  isPublish?: boolean
  dataSlotters: Array<{ type: string; config: any }>
}
