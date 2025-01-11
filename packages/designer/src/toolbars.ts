import type { SnapshotData } from 'db'

import { useClipBoardState } from './state'
import type { CanvasState } from './state/canvas'
import type { CanvasMetaData } from './state/type'
import { exportRaw, handleLogger, importRaw } from './utils'

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
    const snapshot: SnapshotData | undefined = await canvasState.snapshot.lastRecord()
    if (snapshot) {
      canvasState.load(snapshot.canvasData as unknown as CanvasMetaData)
    } else {
      handleLogger.warn('没有快照了')
    }
  }

  const recoveryDraft = async () => {
    const snapshot: SnapshotData | undefined = await canvasState.snapshot.nextRecord()
    if (snapshot) {
      canvasState.load(snapshot.canvasData as unknown as CanvasMetaData)
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
        canvasData: canvasState.export()
      })
    )
  }

  const importCanvas = () => {
    importRaw(fileHandler, '.json')
  }

  const fileHandler = (loadEvent: ProgressEvent<FileReader>) => {
    if (loadEvent.target && loadEvent.target.result) {
      const metaData: CanvasMetaData = JSON.parse(loadEvent.target.result as string)
      canvasState.load(metaData)
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
