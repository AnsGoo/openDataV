<template>
  <div class="h-full flex-col flex flex-nowrap overflow-hidden">
    <div class="w-full h-14 align-middle">
      <ToolBar :toolbars="toolbars" />
    </div>
    <div class="content flex flex-1 flex-nowrap flex-row overflow-auto">
      <template v-if="slots?.left">
        <RenderSlot :slots="slots?.left()" />
      </template>
      <template v-else><LeftSideBar /> </template>
      <div class="canvas flex flex-col flex-nowrap h-full">
        <Canvas class="border border-gray-500 flex-1" />
        <template v-if="slots?.bottom">
          <RenderSlot :slots="slots?.bottom()" />
        </template>
        <template v-else>
          <BottomTip class="h-10" />
        </template>
      </div>
      <template v-if="slots?.right">
        <RenderSlot :slots="slots?.right()" class="h-10" />
      </template>
      <template v-else><RightSideBar /> </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import { RenderSlot, useData, useProp } from '@open-data-v/base'
import { onUnmounted, provide, readonly, useSlots } from 'vue'

import type { ToolBarItemType } from '../../components'
import LeftSideBar from '../../pane/LeftSideBar'
import RightSideBar from '../../pane/RightSideBar'
import ToolBar from '../../pane/Toolsbar'
import { useCanvasState } from '../../state'
import type { LayoutData } from '../../state/type'
import BottomTip from './BottomTip.vue'
import Canvas from './Canvas.vue'

const slots = useSlots()
withDefaults(
  defineProps<{
    toolbars?: ToolBarItemType[]
  }>(),
  {
    toolbars: () => []
  }
)
const canvasState = useCanvasState()

provide('HOOKS', readonly({ useProp, useData }))
const setLayoutData = (data: LayoutData) => {
  canvasState.setLayoutData(data)
}
defineExpose({ setLayoutData })
onUnmounted(() => {
  canvasState.clearCanvas()
})
</script>
<style lang="less" scoped>
@import '../../css/index.less';
.canvas {
  flex: 1;
  transition-property: width;
  transition-duration: 0.5s;
  overflow: hidden;
}
</style>
