<template>
  <n-layout class="home">
    <n-layout-header class="header">
      <ToolBar />
    </n-layout-header>
    <!-- 左侧组件列表 -->
    <n-layout has-sider class="main">
      <n-layout-sider
        class="left"
        :width="400"
        :collapsed="true"
        :native-scrollbar="false"
        :collapsed-width="80"
        bordered
        collapse-mode="width"
      >
        <ApiType @change="menuChange" />
      </n-layout-sider>
      <n-layout has-sider sider-placement="right">
        <!-- 中间画布 -->
        <n-layout-content v-resize="editorWindowResizeHandler" class="content">
          <n-scrollbar x-scrollable :style="scrollbarStyle">
            <RequestContent :active="activeKey" />
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
          <DataHistory :active="activeKey" />
        </n-layout-sider>
      </n-layout>

      <!-- 右侧属性列表 -->
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
import ApiType from '@/apiView/siderBar/indext'
import ToolBar from '@/apiView/ToolBar'
import RequestContent from '@/apiView/RequestContent'
import DataHistory from '@/apiView/DataHistory'
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

const activeKey = ref<string>('REST')
const menuChange = (value: string) => {
  activeKey.value = value
}

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
