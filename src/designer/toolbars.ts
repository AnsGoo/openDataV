import useCanvasState from 'open-data-v/designer/state/canvas'
import useSnapShotState from 'open-data-v/designer/state/snapshot'
import type { ComponentDataType } from 'open-data-v/designer/type'
import { message } from 'open-data-v/utils/message'

import type { StoreComponentData } from './db'
import type { CanvasStyleData } from './state/type'
import { exportRaw, importRaw } from './utils'

const snapShotState = useSnapShotState()
// 状态管理
const canvasState = useCanvasState()
const undo = async () => {
  const snapshot: StoreComponentData | undefined = await snapShotState.lastRecord()
  if (snapshot) {
    canvasState.setLayoutData({
      canvasData: snapshot.canvasData as ComponentDataType[],
      canvasStyle: snapshot.canvasStyle,
      dataSlotters: snapshot.dataSlotters
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
      canvasStyle: snapshot.canvasStyle,
      dataSlotters: snapshot.dataSlotters
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
      canvasStyle: canvasState.canvasStyleData,
      dataSlotters: canvasState.dataSlotterData
    })
  )
}

const importCanvas = () => {
  importRaw(fileHandler, '.json')
}

const fileHandler = (loadEvent: ProgressEvent<FileReader>) => {
  if (loadEvent.target && loadEvent.target.result) {
    const layoutComponents: {
      canvasData: ComponentDataType[]
      canvasStyle: CanvasStyleData
      dataSlotters: Array<{ type: string; config: any }>
    } = JSON.parse(loadEvent.target.result as string)
    if (layoutComponents) {
      canvasState.setComponentData(layoutComponents.canvasData)
    }
    canvasState.setLayoutData(layoutComponents)
  }
}

export { exportCanvas, importCanvas, recoveryDraft, setShowEm, undo }
