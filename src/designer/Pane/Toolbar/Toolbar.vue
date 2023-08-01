<template>
  <ToolBar v-if="toolbars.length > 0" :bars="toolbars">
    <div class="tool-bar-title">{{ canvasState.name }}</div>
  </ToolBar>
</template>

<script setup lang="ts">
import { ToolBar } from 'open-data-v/components/ToolBar'
import type { ToolBarItemType } from 'open-data-v/designer/components/ToolBar'
import useCanvasState from 'open-data-v/designer/state/canvas'

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
