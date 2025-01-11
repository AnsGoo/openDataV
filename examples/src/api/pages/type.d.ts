import type { CustomComponent } from '@open-data-v/base'

import type {
  ContainerType,
  EditMode,
  IComponentData,
  IContainerItem,
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
  formItems?: Array<IContainerItem>
  mode?: ContainerType
}

export interface ComponentTreeData {
  id: 'root'
  component: 'root'
  subComponents: CustomComponent[]
}
export interface CanvasData {
  editMode: EditMode
  componentData: Array<CustomComponent>
  activeComponent?: CustomComponent
  isShowEm: boolean
  ids: Set<string>
  benchmarkComponent?: CustomComponent
  scale: number
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
  formItems?: Array<IContainerItem>
  mode?: ContainerType
}

export interface CopyItem {
  copyData: Optional<IComponentData>
  isCut: boolean
}
export interface SelectedRectData {
  rect: Position
  components: CustomComponent[]
  ids: Set
}

export interface CanvasMetaData {
  width: number
  height: number
  background: any
  extraAttrs?: any
  components: Array<IComponentData>
  dataOptions?: Record<string, DataOption>
}
