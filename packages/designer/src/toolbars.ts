import type { IComponentData } from '@open-data-v/base'

import type { StoreComponentData } from './db'
import { useClipBoardState, useSnapshotState } from './state'
import type { CanvasState } from './state/canvas'
import type { CanvasStyleData } from './state/type'
import { exportRaw, handleLogger, importRaw } from './utils'

const snapShotState = useSnapshotState()
const clipBoardState = useClipBoardState()
export function useCanvasActions(canvasState: CanvasState) {
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
    const component = clipBoardState.paste(true, x, y)
    if (!component) return
    canvasState.appendComponent(component)
  }

  const clearCanvas = () => {
    canvasState.clearCanvas()
  }

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

  const exportCanvas = (id: string, name = 'OpenDataV') => {
    exportRaw(
      `${name}.json`,
      JSON.stringify({
        id: id,
        name: name,
        canvasData: canvasState.layoutData
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

  return {
    undo,
    recoveryDraft,
    setShowEm,
    exportCanvas,
    importCanvas,
    paste,
    fullScreen,
    clearCanvas,
    copy,
    decompose
  }
}
