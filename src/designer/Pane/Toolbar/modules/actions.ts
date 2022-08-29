import { useBasicStoreWithOut } from '@/store/modules/basic'
import { useProjectSettingStoreWithOut } from '@/store/modules/projectSetting'
import { useSnapShotStoreWithOut } from '@/store/modules/snapshot'
import { ComponentDataType } from '@/types/component'
import { CanvasStyleData } from '@/types/storeTypes'
import { StoreComponentData } from '@/utils/db'
import { message } from '@/utils/message'
import { exportRaw, importRaw } from '@/utils/utils'
const snapShotStore = useSnapShotStoreWithOut()
// 状态管理
const basicStore = useBasicStoreWithOut()
const projectStore = useProjectSettingStoreWithOut()
const undo = async () => {
  const snapshot: StoreComponentData | undefined = await snapShotStore.lastRecord()
  if (snapshot) {
    basicStore.setLayoutData({ canvasData: snapshot.canvasData, canvasStyle: snapshot.canvasStyle })
  } else {
    message.warning('没有快照了')
  }
}

const recoveryDraft = async () => {
  const snapshot: StoreComponentData | undefined = await snapShotStore.nextRecord()
  if (snapshot) {
    basicStore.setLayoutData({ canvasData: snapshot.canvasData, canvasStyle: snapshot.canvasStyle })
  } else {
    message.warning('没有快照了')
  }
}
const setShowEm = () => {
  basicStore.toggleShowEm()
}

const exportCanvas = () => {
  const name: string = `${basicStore.name}` || 'layout'
  exportRaw(
    `${name}.json`,
    JSON.stringify({
      canvasData: basicStore.layoutData,
      canvasStyle: basicStore.canvasStyleData
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
      basicStore.setComponentData(layoutComponents.canvasData)
      basicStore.setCanvasStyle(layoutComponents.canvasStyle)
    }
  }
}

const toggleTheme = () => {
  projectStore.setNavTheme(!projectStore.darkTheme ? 'light' : 'dark')
  projectStore.setDarkTheme(!projectStore.darkTheme)
}

export { undo, recoveryDraft, setShowEm, exportCanvas, importCanvas, toggleTheme }
