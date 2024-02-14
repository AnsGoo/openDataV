<template>
  <x-icon
    v-contextmenu.stop="contextmenus"
    draggable="true"
    :size="18"
    :name="name"
    @dragstart="handleDragStart($event, index)"
    @drop="handleDrop($event, index)"
    @dragover="handleDragOver($event, index, true)"
  />
</template>

<script lang="ts" setup>
import type { CustomComponent } from '@open-data-v/base'
import { eventBus, StaticKey } from '@open-data-v/base'

import { useCanvasState } from '../../../state'
import type { ContextmenuItem } from '../../../type'

const props = withDefaults(
  defineProps<{
    component: CustomComponent
    index: string
    activeKey?: string
    mode?: string
    name: string
    contextmenus: () => ContextmenuItem[]
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
  const cutComponent: Optional<CustomComponent> = canvasState.getComponentByIndex(indexes)
  const component: Optional<CustomComponent> = canvasState.cutComponent(
    indexes[indexes.length - 1],
    cutComponent?.parent
  )
  if (component && toIndex) {
    const toIndexs: number[] = componentIndex.split('-').map((i) => Number(i))
    const insertComponent: Optional<CustomComponent> = canvasState.getComponentByIndex(toIndexs)
    canvasState.insertComponent(toIndexs[toIndexs.length - 1], component, insertComponent)
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
