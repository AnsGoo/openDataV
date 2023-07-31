<template>
  <ToolBar v-if="toolbars.length > 0" :bars="toolbars">
    <div class="tool-bar-title">{{ canvasState.name }}</div>
  </ToolBar>
</template>

<script setup lang="ts">
import useCanvasState from 'open-data-v/designer/state/canvas'

import type { ToolBarItemType } from '@/components/ToolBar'
import { ToolBar } from '@/components/ToolBar'

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
