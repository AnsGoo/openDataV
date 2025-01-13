import type { CustomComponent } from '@open-data-v/base'

import type { EditMode, IComponentData, Position, StoreComponentData } from '../type'

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
  stackNumber: number
  latestSnapshot?: StoreComponentData
  timeHandler?: TimeoutHandle
  cursor: number
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
