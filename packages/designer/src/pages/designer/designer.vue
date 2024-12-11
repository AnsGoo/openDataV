<template>
  <div class="h-full flex-col flex flex-nowrap overflow-hidden">
    <template v-if="slots?.top">
      <RenderSlot :slots="slots?.top()" />
    </template>
    <template v-else>
      <ToolBar :toolbars="toolbars" />
    </template>
    <div class="content flex flex-1 flex-nowrap flex-row overflow-auto">
      <slot name="left"> </slot>
      <div class="canvas flex flex-col flex-nowrap h-full">
        <Canvas class="border border-gray-500 flex-1" />
        <template v-if="slots?.bottom">
          <RenderSlot :slots="slots?.bottom()" />
        </template>
        <template v-else>
          <BottomTip />
        </template>
      </div>
      <template v-if="slots?.right">
        <RenderSlot :slots="slots?.right()" />
      </template>
      <template v-else><RightSideBar /> </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import { RenderSlot, useData, useProp } from '@open-data-v/base'
import { defineAsyncComponent, onUnmounted, provide, readonly, useSlots } from 'vue'

import { HOOKS } from '../../const'
import { useCanvasState } from '../../state'
import type { LayoutData } from '../../state/type'
import Canvas from './canvas.vue'

const ToolBar = defineAsyncComponent(() => import('../../panel/tools-bar'))

const RightSideBar = defineAsyncComponent(() => import('../../panel/right-side-bar'))
const BottomTip = defineAsyncComponent(() => import('./bottom-tip.vue'))

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

provide(HOOKS, readonly({ useProp, useData }))
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
