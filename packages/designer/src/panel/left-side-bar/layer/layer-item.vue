<template>
  <div
    draggable="true"
    @dragstart="handleDragStart($event, level)"
    @drop="handleDrop($event, level)"
    @dragover="handleDragOver($event, level, true)"
  >
    <div
      v-if="component.component === 'Group'"
      class="flex flex-nowrap flex-row justify-between content-center items-center"
    >
      <span v-show="mode === 'expand'">{{ component.name || '分组' }}</span>
      <x-icon :name="toggleIcon(component.display)" :size="18" />
    </div>
    <div v-else class="flex flex-nowrap flex-row justify-between content-center items-center">
      <span v-show="mode === 'expand'">{{ component.name }}</span>
      <x-icon :name="toggleIcon(component.display)" :size="18" />
    </div>
  </div>
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
  }>(),
  {
    mode: 'expand'
  }
)

const toggleIcon = (isDisplay: boolean) => (isDisplay ? 'previewOpen' : 'previewClose')

const { handleDragStart, handleDragOver, handleDrop } = useLayerDrag(props.activeKey)
</script>
