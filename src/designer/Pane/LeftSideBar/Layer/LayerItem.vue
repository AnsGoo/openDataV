<template>
  <div
    v-contextmenu.stop="contextmenus"
    draggable="true"
    class="layer"
    @dragstart="handleDragStart($event, index)"
    @drop="handleDrop($event, index)"
    @dragover="handleDragOver($event, index, true)"
  >
    <span v-show="mode === 'expand'">{{ component.name }}</span>
    <x-icon :name="toggleIcon(component.display)" :size="18" />
  </div>
</template>

<script lang="ts" setup>
import { cloneDeep } from 'lodash-es'
import type { CustomComponent } from 'open-data-v/base'
import { eventBus, StaticKey } from 'open-data-v/base'
import type { ContextmenuItem } from 'open-data-v/designer'
import { useCanvasState } from 'open-data-v/designer'

import { diffIndex } from '../../../utils'

const props = withDefaults(
  defineProps<{
    component: CustomComponent
    index: string
    activeKey?: string
    mode?: string
    contextmenus: () => ContextmenuItem[]
  }>(),
  {
    mode: 'expand'
  }
)

const emits = defineEmits<{ (e: 'select', index: string): void }>()
const canvasState = useCanvasState()

const toggleIcon = (isDisplay: boolean) => (isDisplay ? 'previewOpen' : 'previewClose')

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

const handleDrop = (event: DragEvent, toIndex: string) => {
  event.preventDefault()
  event.stopPropagation()
  const fromIndex: string = event.dataTransfer?.getData('componentIndex') as string
  const isDragAble = diffIndex(fromIndex, toIndex)
  if (!isDragAble) return
  const indexes: number[] = fromIndex.split('-').map((i) => Number(i))
  const cutComponent: Optional<CustomComponent> = canvasState.getComponentByIndex(indexes)
  const inComponent = cloneDeep(cutComponent)
  const toIndexs: number[] = toIndex.split('-').map((i) => Number(i))
  const toComponent: Optional<CustomComponent> = canvasState.getComponentByIndex(toIndexs)

  if (inComponent && toComponent && toIndex) {
    const toComponentId: string = toComponent.id
    canvasState.cutComponent(indexes[indexes.length - 1], cutComponent?.parent)
    const parent = toComponent.parent || undefined
    const data = parent ? parent.subComponents : canvasState.componentData
    const newToIndex = data.findIndex((el) => el.id === toComponentId)
    canvasState.insertComponent(newToIndex!, inComponent!, parent)
    emits('select', toIndex)
  }
}
</script>

<style lang="less" scoped>
.layer {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: space-between;
  align-items: center;
}
</style>
