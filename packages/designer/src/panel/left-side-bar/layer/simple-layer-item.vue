<template>
  <x-icon
    draggable="true"
    :size="18"
    :name="icon"
    @dragstart="handleDragStart($event, level)"
    @drop="handleDrop($event, level)"
    @dragover="handleDragOver($event, level, true)"
  />
</template>

<script lang="ts" setup>
import type { CustomComponent } from '@open-data-v/base'
import { eventBus, StaticKey } from '@open-data-v/base'

import { useCanvasState } from '../../../state'

const props = withDefaults(
  defineProps<{
    component: CustomComponent
    level: string
    activeKey?: string
    mode?: string
    icon?: string
  }>(),
  {
    mode: 'expand'
  }
)

const emits = defineEmits<{ (e: 'select', index: string): void }>()
const canvasState = useCanvasState()

const handleDragStart = (event: DragEvent, index: string) => {
  // event.preventDefault()
  event.dataTransfer?.setData('componentIndex', index)
  event.stopPropagation()
}

const handleDragOver = (event: DragEvent, index: string, isEmit = false) => {
  event.preventDefault()
  event.stopPropagation()
  if (isEmit && index !== props.activeKey) {
    eventBus.emit(StaticKey.ACTIVE_MENU, index)
  }
}

const handleDrop = (event: DragEvent, index: string) => {
  event.preventDefault()
  event.stopPropagation()
  const componentIndex: string = event.dataTransfer?.getData('componentIndex') as string
  const toIndex: string = calcDragIndex(componentIndex, index)
  const indexes: number[] = componentIndex.split('-').map((i) => Number(i))
  const curComponent: CustomComponent | undefined = canvasState.getComponentByIndex(indexes)
  if (!curComponent) {
    return
  }
  const component: CustomComponent | undefined = canvasState.removeComponent(
    curComponent as CustomComponent
  )
  if (component && toIndex) {
    const toIndexs: number[] = componentIndex.split('-').map((i) => Number(i))
    canvasState.insertComponent(component, toIndexs)
    emits('select', index)
  }
}
const calcDragIndex = (fromIndex: string, toIndex: string): string => {
  const fromIndexs: number[] = fromIndex.split('-').map((el: string) => parseInt(el))
  const toIndexs: number[] = toIndex.split('-').map((el: string) => parseInt(el))
  const fromLength: number = fromIndexs.length
  for (let i = 0; i < fromLength; i++) {
    if (fromIndexs[i] > toIndexs[i]) {
      return toIndex
    } else if (fromIndexs[i] < toIndexs[i]) {
      if (i + 1 == fromLength) {
        toIndexs[i] = toIndexs[i] - 1
        return toIndexs.join('-')
      } else {
        return toIndex
      }
    }
  }
  return toIndex
}
</script>
