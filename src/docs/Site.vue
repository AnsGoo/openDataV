<template>
  <n-layout position="absolute">
    <n-layout-header style="height: 60px"><ToolBar /></n-layout-header>
    <n-layout has-sider sider-placement="left" style="height: calc(99vh - 60px); overflow: hidden">
      <RouterView />
      <n-layout-footer position="absolute"
        ><div class="copyleft">
          <div>OpenDataV · Made by AnsGoo</div>
        </div></n-layout-footer
      >
    </n-layout>
  </n-layout>
</template>
<script lang="ts" setup>
import { NLayout, NLayoutHeader, NLayoutFooter } from 'naive-ui'
import ToolBar from './modules/ToolBar'
import '@/css/markdown.css'
</script>
<style scoped lang="less">
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
