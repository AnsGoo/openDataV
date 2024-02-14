<template>
  <ToolBar v-if="toolbars.length > 0" :bars="toolbars" class="w-full">
    <div class="tool-bar-title">{{ canvasState.name }}</div>
  </ToolBar>
</template>

<script setup lang="ts">
import type { ToolBarItemType } from 'open-data-v/designer'
import { ToolBar, useCanvasState } from 'open-data-v/designer'

const canvasState = useCanvasState()

withDefaults(
  defineProps<{
    toolbars?: Array<ToolBarItemType>
  }>(),
  {
    toolbars: () => []
  }
)
</script>

<style scoped lang="less">
.tool-bar-title {
  font-size: 20px;
  font-weight: 400;
}
</style>
