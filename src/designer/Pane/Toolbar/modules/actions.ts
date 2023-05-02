import useCanvasState from '@/designer/state/canvas'
import { useProjectSettingStoreWithOut } from '@/store/modules/projectSetting'
import useSnapShotState from '@/designer/state/snapshot'
import type { ComponentDataType } from '@/types/component'
import type { CanvasStyleData } from '@/types/storeTypes'
import type { StoreComponentData } from '@/utils/db'
import { exportRaw, importRaw } from '@/utils/utils'
import { message } from '@/utils/message'

const snapShotState = useSnapShotState()
// 状态管理
const canvasState = useCanvasState()
const projectStore = useProjectSettingStoreWithOut()
const undo = async () => {
  const snapshot: StoreComponentData | undefined = await snapShotState.lastRecord()
  if (snapshot) {
    canvasState.setLayoutData({
      canvasData: snapshot.canvasData as ComponentDataType[],
      canvasStyle: snapshot.canvasStyle
    })
  } else {
    message.warning('没有快照了')
  }
}

const recoveryDraft = async () => {
  const snapshot: StoreComponentData | undefined = await snapShotState.nextRecord()
  if (snapshot) {
    canvasState.setLayoutData({
      canvasData: snapshot.canvasData as ComponentDataType[],
      canvasStyle: snapshot.canvasStyle
    })
  } else {
    message.warning('没有快照了')
  }
}
const setShowEm = () => {
  canvasState.toggleShowEm()
}

const exportCanvas = (id: string) => {
  const name: string = `${canvasState.name}` || 'OpenDataV'
  exportRaw(
    `${name}.json`,
    JSON.stringify({
      id: id,
      name: name,
      canvasData: canvasState.layoutData,
      canvasStyle: canvasState.canvasStyleData
    })
  )
}

const importCanvas = () => {
  importRaw(fileHandler, '.json')
}

const fileHandler = (loadEvent: ProgressEvent<FileReader>) => {
  if (loadEvent.target && loadEvent.target.result) {
    const layoutComponents: { canvasData: ComponentDataType[]; canvasStyle: CanvasStyleData } =
      JSON.parse(loadEvent.target.result as string)
    if (layoutComponents) {
      canvasState.setComponentData(layoutComponents.canvasData)
      canvasState.setCanvasStyle(layoutComponents.canvasStyle)
    }
  }
}

const toggleTheme = () => {
  projectStore.setNavTheme(!projectStore.darkTheme ? 'light' : 'dark')
  projectStore.setDarkTheme(!projectStore.darkTheme)
}

export { undo, recoveryDraft, setShowEm, exportCanvas, importCanvas, toggleTheme }
