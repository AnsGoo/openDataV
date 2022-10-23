<template>
  <n-layout position="absolute">
    <n-layout-header style="height: 60px"><ToolBar /></n-layout-header>
    <n-layout has-sider sider-placement="left" style="height: calc(99vh - 60px); overflow: hidden">
      <n-layout-sider
        class="right"
        width="200"
        :collapsed="collapsedLeft"
        :native-scrollbar="false"
        bordered
        :collapsed-width="55"
        collapse-mode="width"
        show-trigger="arrow-circle"
        @collapse="() => (collapsedLeft = true)"
        @expand="() => (collapsedLeft = false)"
      >
        <ComponentList />
      </n-layout-sider>
      <n-layout-content class="content">
        <n-scrollbar x-scrollable style="height: 100vh">
          <RenderMD>
            <RouterView />
          </RenderMD>
        </n-scrollbar>
      </n-layout-content>
      <n-layout-footer position="absolute"
        ><div class="copyleft">
          <div>Naive UI 2.33.5 · Made by TuSimple</div>
        </div></n-layout-footer
      >
    </n-layout>
  </n-layout>
</template>
<script lang="ts" setup>
import {
  NLayout,
  NLayoutHeader,
  NLayoutFooter,
  NLayoutSider,
  NLayoutContent,
  NScrollbar
} from 'naive-ui'
import ToolBar from './ToolBar'
import ComponentList from './components/ComponentList.vue'
import '@/css/markdown.css'
import RenderMD from './RenderMD.vue'
import { ref } from 'vue'
const collapsedLeft = ref(false)
</script>
<style scoped>
:deep(.n-layout .n-layout-scroll-container) {
  overflow-x: initial;
}
.copyleft {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: center;
  align-items: center;
}
</style>
