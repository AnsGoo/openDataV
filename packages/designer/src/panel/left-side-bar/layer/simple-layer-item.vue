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

import { useLayerDrag } from './use'

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

const { handleDragStart, handleDragOver, handleDrop } = useLayerDrag(props.activeKey)
</script>
