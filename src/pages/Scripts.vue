<template>
  <n-layout class="home">
    <n-layout-header class="header">
      <ToolBar />
    </n-layout-header>
    <!-- 左侧组件列表 -->
    <n-layout has-sider sider-placement="right" class="main">
      <!-- 中间画布 -->
      <n-layout-content v-resize="editorWindowResizeHandler" class="content">
        <n-scrollbar x-scrollable :style="scrollbarStyle">
          <ScriptContent />
        </n-scrollbar>
      </n-layout-content>
      <n-layout-sider
        class="right"
        width="240"
        :collapsed="collapsedRight"
        :native-scrollbar="false"
        bordered
        :collapsed-width="35"
        collapse-mode="width"
        show-trigger="arrow-circle"
        @collapse="collapsedRight = true"
        @expand="collapsedRight = false"
      >
        <ScriptHistory />
      </n-layout-sider>
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
import ToolBar from '@/apiView/ToolBar'
import ScriptContent from '@/scriptView/Conetent.vue'
import ScriptHistory from '@/scriptView/History.vue'
import { ref, computed } from 'vue'
import { NLayout, NLayoutContent, NLayoutHeader, NLayoutSider, NScrollbar } from 'naive-ui'
const collapsedRight = ref(false)

const windowWidth = ref<number>(0)
const windowHeight = ref<number>(0)
const scrollbarStyle = computed(() => {
  return {
    width: windowWidth.value + 'px',
    height: windowHeight.value + 'px'
  }
})

const editorWindowResizeHandler = (entry: ResizeObserverEntry) => {
  const { width, height } = entry.contentRect
  windowWidth.value = width
  windowHeight.value = height
}
</script>

<style scoped lang="less">
.header {
  height: 5vh;
}

.main {
  height: 94vh;
}
</style>
