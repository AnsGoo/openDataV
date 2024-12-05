import type { IComponentData } from '@open-data-v/base'

import type { StoreComponentData } from './db'
import { useCanvasState, useClipBoardState, useSnapshotState } from './state'
import type { CanvasStyleData } from './state/type'
import { exportRaw, handleLogger, importRaw } from './utils'

const snapShotState = useSnapshotState()
const clipBoardState = useClipBoardState()

// 状态管理
const canvasState = useCanvasState()
const undo = async () => {
  const snapshot: StoreComponentData | undefined = await snapShotState.lastRecord()
  if (snapshot) {
    canvasState.setLayoutData({
      canvasData: snapshot.canvasData as IComponentData[],
      canvasStyle: snapshot.canvasStyle,
      dataSlotters: snapshot.dataSlotters
    })
  } else {
    handleLogger.warn('没有快照了')
  }
}

const recoveryDraft = async () => {
  const snapshot: StoreComponentData | undefined = await snapShotState.nextRecord()
  if (snapshot) {
    canvasState.setLayoutData({
      canvasData: snapshot.canvasData as IComponentData[],
      canvasStyle: snapshot.canvasStyle,
      dataSlotters: snapshot.dataSlotters
    })
  } else {
    handleLogger.warn('没有快照了')
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
      canvasData: IComponentData[]
      canvasStyle: CanvasStyleData
      dataSlotters: Array<{ type: string; config: any }>
    } = JSON.parse(loadEvent.target.result as string)
    if (layoutComponents) {
      canvasState.setComponentData(layoutComponents.canvasData)
    }
    canvasState.setLayoutData(layoutComponents)
  }
}

const decompose = () => {
  canvasState.decompose()
}
const copy = () => {
  canvasState.activeComponent && clipBoardState.copy(canvasState.activeComponent.toJson(false))
}

const fullScreen = () => {
  const el: HTMLElement | null = document.querySelector('#editor')
  if (document.fullscreenEnabled && el) {
    el.requestFullscreen()
  }
}

const paste = (_: HTMLElement, event: MouseEvent) => {
  const editorRectInfo = document.querySelector('#editor')!.getBoundingClientRect()
  const y = event.pageY - editorRectInfo.top
  const x = event.pageX - editorRectInfo.left
  clipBoardState.paste(true, x, y)
}

const clearCanvas = () => {
  canvasState.clearCanvas()
}

export {
  clearCanvas,
  copy,
  decompose,
  exportCanvas,
  fullScreen,
  importCanvas,
  paste,
  recoveryDraft,
  setShowEm,
  undo
}
