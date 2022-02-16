import type { ComponentInfo } from '@/types/component'
import type { Setting } from '@/types/apiTypes'

export interface Component {
  style: Recordable<string>
}

export interface CanvasStyleData {
  width: number
  height: number
  scale: number
  alertWs: string
  dataWs: string
  image: string
}

export interface EditData {
  name: string
  thumbnail: string
  editMode: string
  canvasStyleData: CanvasStyleData
  componentData: Array<any>
  curComponent: ComponentInfo | undefined
  curComponentIndex: number | undefined
  isClickComponent: boolean
  isShowEm: boolean
  layerComponent: ComponentInfo | undefined
}

export interface MenuStatus {
  menuTop: number
  menuLeft: number
  menuShow?: boolean
}

export interface ItemData {
  data: any
  index: number | undefined
}

export interface CopyItem {
  copyData: ItemData | undefined
  isCut: boolean
}

export interface SnapData {
  snapshotData: Array<any>
  snapshotMax: number
}

export interface Postion {
  top: number
  left: number
  width: number
  height: number
  rotate?: number
}

export interface ComponentPos {
  component: any
  index?: number
}

export interface AreaData {
  style: Postion
  components: Array<ComponentInfo>
}

export interface UserInfo {
  username: string
  token: string | undefined
  permissions: string[]
}

export interface SystemSetting {
  setting: Array<Setting>
}
