<template>
  <o-layout class="home">
    <o-layout-header class="header">
      <ToolBar :toolbars="toolbars" />
    </o-layout-header>
    <!-- 左侧组件列表 -->
    <o-layout has-sider class="main">
      <o-layout-sider
        class="left"
        width="15rem"
        :collapsed="collapsedLeft"
        :native-scrollbar="false"
        bordered
        collapse-mode="width"
        show-trigger
        @collapse="collapsedLeft = true"
        @expand="collapsedLeft = false"
      >
        <LeftSideBar
          v-model:iscollapsed="collapsedLeft"
          @update:iscollapsed="
            (value) => {
              collapsedLeft = value
            }
          "
        />
      </o-layout-sider>
      <o-layout has-sider sider-placement="right">
        <Canvas />
        <o-layout-sider
          class="right"
          width="20rem"
          :collapsed="collapsedRight"
          :native-scrollbar="false"
          bordered
          collapse-mode="width"
          show-trigger="arrow-circle"
          @collapse="collapsedRight = true"
          @expand="collapsedRight = false"
        >
          <RightSideBar
            v-model:iscollapsed="collapsedRight"
            @update:iscollapsed="
              (value) => {
                collapsedRight = value
              }
            "
          />
        </o-layout-sider>
      </o-layout>

      <!-- 右侧属性列表 -->
    </o-layout>
  </o-layout>
</template>

<script setup lang="ts">
import { useData, useProp } from 'open-data-v/base'
import type { ToolBarItemType } from 'open-data-v/designer'
import { useCanvasState } from 'open-data-v/designer'
import { OLayout, OLayoutHeader, OLayoutSider } from 'open-data-v/ui'
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
.home > :deep(.o-layout-scroll-container:first-child) {
  @apply flex flex-col h-screen;
  .header {
    @apply h-12;
  }
}
</style>
