<template>
  <div class="main h-fit flex-col flex flex-nowrap">
    <div class="w-full h-14 align-middle">
      <ToolBar :toolbars="toolbars" />
    </div>
    <div class="content flex flex-nowrap flex-row">
      <div class="left o-scroll">
        <Toggle
          :direction="leftDreiction"
          :x="leftWidth"
          location="left"
          @click="collapsedLeft = !collapsedLeft"
        />
        <LeftSideBar
          :iscollapsed="collapsedLeft"
          @update:iscollapsed="
            (value) => {
              collapsedLeft = value
            }
          "
        />
      </div>
      <Canvas class="canvas border border-gray-500" />
      <div class="right o-scroll">
        <Toggle
          :x="rightWidth"
          location="right"
          :direction="rightDreiction"
          @click="collapsedRight = !collapsedRight"
        />
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
import { useData, useProp } from '@open-data-v/base'
import { computed, onUnmounted, provide, readonly, ref } from 'vue'

import type { ToolBarItemType } from '../../components'
import LeftSideBar from '../../pane/LeftSideBar'
import RightSideBar from '../../pane/RightSideBar'
import ToolBar from '../../pane/Toolsbar'
import { useCanvasState } from '../../state'
import type { LayoutData } from '../../state/type'
import Canvas from './Canvas.vue'
import Toggle from './Toggle.vue'

withDefaults(
  defineProps<{
    toolbars?: ToolBarItemType[]
  }>(),
  {
    toolbars: () => []
  }
)
const canvasState = useCanvasState()

const collapsedLeft = ref(true)
const collapsedRight = ref(true)
provide('HOOKS', readonly({ useProp, useData }))
const setLayoutData = (data: LayoutData) => {
  canvasState.setLayoutData(data)
}
defineExpose({ setLayoutData })

onUnmounted(() => {
  canvasState.clearCanvas()
})
const leftWidth = computed<string>(() => (collapsedLeft.value ? '18rem' : '4rem'))
const leftDreiction = computed<'left' | 'right'>(() => (collapsedLeft.value ? 'left' : 'right'))

const rightWidth = computed<string>(() => (collapsedRight.value ? '18rem' : '4rem'))
const rightDreiction = computed<'left' | 'right'>(() => (collapsedRight.value ? 'right' : 'left'))

const canvasWidth = computed<string>(() => `calc(100vw - ${leftWidth.value} - ${rightWidth.value})`)
</script>
<style lang="less" scoped>
@import '../../css/index.less';
.main {
  .content {
    width: 100vw;
    height: calc(100vh - 3.5rem);
    .canvas {
      transition-property: width;
      transition-duration: 0.5s;
      width: v-bind(canvasWidth);
    }
    .left {
      transition-property: width;
      transition-duration: 0.5s;
      width: v-bind(leftWidth);
      overflow: hidden;
    }
    .right {
      transition-property: width;
      transition-duration: 0.5s;
      width: v-bind(rightWidth);
      height: 100%;
      overflow: hidden;
    }
  }
}
</style>
