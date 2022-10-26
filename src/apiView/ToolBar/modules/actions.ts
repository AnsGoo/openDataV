import { useBasicStoreWithOut } from '@/store/modules/basic'
import { useProjectSettingStoreWithOut } from '@/store/modules/projectSetting'
import type { ComponentDataType } from '@/types/component'
import type { CanvasStyleData } from '@/types/storeTypes'

import { exportRaw, importRaw } from '@/utils/utils'

// 状态管理
const basicStore = useBasicStoreWithOut()
const projectStore = useProjectSettingStoreWithOut()

const exportCanvas = (id: string) => {
  const name: string = `${basicStore.name}` || 'OpenDataV'
  exportRaw(
    `${name}.json`,
    JSON.stringify({
      id: id,
      name: name,
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

export { exportCanvas, importCanvas, toggleTheme }
