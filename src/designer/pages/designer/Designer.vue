<template>
  <n-layout class="home">
    <n-layout-header class="header">
      <ToolBar :toolbars="toolbars" />
    </n-layout-header>
    <!-- 左侧组件列表 -->
    <n-layout has-sider class="main">
      <n-layout-sider
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
      </n-layout-sider>
      <n-layout has-sider sider-placement="right">
        <Canvas />
        <n-layout-sider
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
        </n-layout-sider>
      </n-layout>

      <!-- 右侧属性列表 -->
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
import { NLayout, NLayoutHeader, NLayoutSider } from 'naive-ui'
import type { ToolBarItemType } from 'open-data-v/designer/components/ToolBar'
import useCanvasState from 'open-data-v/designer/state/canvas'
import hooks from 'open-data-v/models/hooks'
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
provide('HOOKS', readonly(hooks))
const setLayoutData = (data: LayoutData) => {
  canvasState.setLayoutData(data)
}
defineExpose({ setLayoutData })

onUnmounted(() => {
  canvasState.clearCanvas()
})
</script>

<style scoped lang="less">
.home > :deep(.n-layout-scroll-container:first-child) {
  @apply flex flex-col h-screen;
  .header {
    @apply h-12;
  }
}
</style>
