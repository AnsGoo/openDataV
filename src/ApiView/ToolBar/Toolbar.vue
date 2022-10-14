<template>
  <ToolBar :bars="toolBars" />
</template>

<script setup lang="ts">
import { h } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { importCanvas, exportCanvas, toggleTheme } from './modules/actions'
import ThemeIcon from './modules/themeSwitch/ThemeIcon.vue'
import { ToolBar } from '@/components/ToolBar'
import type { ToolBarItemType } from '@/components/ToolBar'
import LogoView from '@/components/LogoView'

const router = useRouter()
const route = useRoute()

const toolBars: ToolBarItemType[] = [
  {
    label: '首页',
    action: (_e: MouseEvent) => {
      router.push({
        name: 'Pages'
      })
    },
    icon: () =>
      h(LogoView, {
        width: '40px'
      }),
    divider: true,
    location: 'left',
    isButton: false
  },
  {
    label: '导入',
    action: importCanvas,
    icon: 'upload-one',
    location: 'right'
  },
  {
    label: '导出',
    action: () => exportCanvas((route.params.index as string) || ''),
    icon: 'download-one',
    location: 'right'
  },
  {
    label: '主题',
    action: toggleTheme,
    icon: () => h(ThemeIcon),
    location: 'right'
  }
]
</script>

<style scoped lang="less">
.tool-bar {
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  height: 100%;
  border-bottom: 1px var(--n-text-color) solid;
}
.tool-bar-item {
  height: 100%;
  display: flex;
  align-items: center;
}

button {
  border: none;
  // padding: 5px 5px;
  margin: auto 3px;
}

.tool-bar-title {
  font-size: 20px;
  font-weight: 400;
}
</style>
