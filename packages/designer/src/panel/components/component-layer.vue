<template>
  <div
    v-contextmenu="() => contextmenus(props.component, props.level)"
    class="select-none"
    @click="handleSelect"
  >
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import type { CustomComponent } from '@open-data-v/base'

import { useCanvasState } from '../../state'
import { useComponentContextMenu } from './use'

const props = defineProps<{
  component: CustomComponent
  level: string
}>()

const emits = defineEmits<{ (e: 'select', component: CustomComponent, level: string): void }>()
const canvasState = useCanvasState()
const handleSelect = () => {
  if (props.component) {
    canvasState.activateComponent(props.component)
  }
  emits('select', props.component, props.level)
}
const contextmenus = useComponentContextMenu()
</script>
