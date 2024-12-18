import type { CustomComponent } from '@open-data-v/base'
import { eventBus, StaticKey } from '@open-data-v/base'

import useCanvasState from '../../../state/canvas'
import { diffIndex } from '../utils'

const useLayerDrag = (activeKey) => {
  const canvasState = useCanvasState()

  const handleDragStart = (event: DragEvent, level: string) => {
    // event.preventDefault()
    event.dataTransfer?.setData('componentLevel', level)
    event.stopPropagation()
  }

  const handleDragOver = (event: DragEvent, level: string, isEmit = true) => {
    event.preventDefault()
    event.stopPropagation()
    if (isEmit && level !== activeKey) {
      eventBus.emit(StaticKey.ACTIVE_MENU, level)
    }
  }

  const handleDrop = (event: DragEvent, toLevel: string) => {
    event.preventDefault()
    event.stopPropagation()
    const fromLevel: string = event.dataTransfer?.getData('componentLevel') as string
    const isDragAble = diffIndex(fromLevel, toLevel)
    if (!isDragAble) return
    const indexes: number[] = fromLevel.split('-').map((i) => Number(i))
    const curComponent: Optional<CustomComponent> = canvasState.getComponentByIndex(indexes)
    const toIndexes: number[] = toLevel.split('-').map((i) => Number(i))
    if (curComponent && toLevel) {
      canvasState.moveComponent(curComponent.id, toIndexes)
      canvasState.activateComponent(curComponent)
    }
  }
  return {
    handleDragStart,
    handleDragOver,
    handleDrop
  }
}

export { useLayerDrag }
