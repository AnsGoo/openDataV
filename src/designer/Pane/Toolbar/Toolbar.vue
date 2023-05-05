<template>
  <ToolBar v-if="toolbars.length > 0" :bars="toolbars">
    <div class="tool-bar-title">{{ canvasState.name }}</div>
  </ToolBar>
</template>

<script setup lang="ts">
import type { ToolBarItemType } from '@/components/ToolBar'
import { ToolBar } from '@/components/ToolBar'
import useCanvasState from '@/designer/state/canvas'

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
