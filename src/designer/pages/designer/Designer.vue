<template>
  <div class="main h-fit flex-col flex flex-nowrap">
    <div class="w-full h-14 align-middle">
      <ToolBar :toolbars="toolbars" />
    </div>
    <div class="content flex flex-nowrap flex-row">
      <div class="left">
        <LeftSideBar
          v-model:iscollapsed="collapsedLeft"
          @update:iscollapsed="
            (value) => {
              collapsedLeft = value
            }
          "
        />
      </div>
      <Canvas class="canvas" />
      <div class="right">
        <RightSideBar
          v-model:iscollapsed="collapsedRight"
          @update:iscollapsed="
            (value) => {
              collapsedRight = value
            }
          "
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useData, useProp } from 'open-data-v/base'
import type { ToolBarItemType } from 'open-data-v/designer'
import { useCanvasState } from 'open-data-v/designer'
import { onUnmounted, provide, readonly, ref } from 'vue'

import type { LayoutData } from '../../../designer/state/type'
import LeftSideBar from '../../Pane/LeftSideBar'
import RightSideBar from '../../Pane/RightSideBar'
import ToolBar from '../../Pane/Toolbar'
import Canvas from './Canvas.vue'

withDefaults(
  defineProps<{
    toolbars?: ToolBarItemType[]
  }>(),
  {
    toolbars: () => []
  }
)
const canvasState = useCanvasState()

const collapsedLeft = ref(false)
const collapsedRight = ref(false)
provide('HOOKS', readonly({ useProp, useData }))
const setLayoutData = (data: LayoutData) => {
  canvasState.setLayoutData(data)
}
defineExpose({ setLayoutData })

onUnmounted(() => {
  canvasState.clearCanvas()
})
</script>
<style scoped lang="less">
.main {
  .content {
    width: 100vw;
    height: calc(95vh - 40px);
    .canvas {
      width: calc(100% - 28vw);
    }
    .left {
      width: 14vw;
      min-width: 35px;
      height: 100%;
    }
    .right {
      width: 14vw;
      height: 100%;
    }
  }
}
</style>
