<template>
  <div class="tool-bar">
    <div class="tool-bar-item">
      <ToolBarItem
        v-for="(item, index) in leftToolBars"
        :key="index"
        :action="item.action"
        :label="item.label"
        :divider="item.divider"
        :icon="item.icon"
      />
    </div>
    <div class="tool-bar-title">{{ basicStore.name }}</div>
    <div class="tool-bar-item">
      <ToolBarItem
        v-for="(item, index) in rightToolBars"
        :key="index"
        :action="item.action"
        :label="item.label"
        :divider="item.divider"
        :icon="item.icon"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ToolBarItemType } from './modules/types'
import {
  undo,
  recoveryDraft,
  importCanvas,
  exportCanvas,
  setShowEm,
  toggleTheme
} from './modules/actions'
import ThemeIcon from './modules/themeSwitch/ThemeIcon.vue'
import showIconCard from './modules/iconList'
import showSaveCard from './modules/save'
import ToolBarItem from './ToolBarItem.vue'
import { useBasicStoreWithOut } from '@/store/modules/basic'
const basicStore = useBasicStoreWithOut()

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
    icon: 'home',
    divider: true,
    location: 'left'
  },
  {
    label: '保存',
    action: () => showSaveCard(route.params.index as string),
    icon: 'save-one',
    location: 'left'
  },
  {
    label: '预览',
    action: (_e: MouseEvent) => {
      const { href } = router.resolve('/preview')
      window.open(href, '_blank')
    },
    icon: 'computer',
    location: 'left'
  },
  {
    label: '撤销',
    action: undo,
    icon: 'back',
    location: 'left'
  },
  {
    label: '恢复',
    action: recoveryDraft,
    icon: 'next',
    location: 'left'
  },
  {
    label: '导出',
    action: () => exportCanvas((route.params.index as string) || ''),
    icon: 'download-one',
    location: 'left'
  },
  {
    label: '导入',
    action: importCanvas,
    icon: 'upload-one',
    location: 'left'
  },
  {
    label: '全屏',
    action: () => {
      const el: HTMLElement | null = document.querySelector('#editor')
      if (document.fullscreenEnabled && el) {
        el.requestFullscreen()
      }
    },
    icon: 'full-screen',
    location: 'left'
  },
  {
    label: '坐标',
    action: setShowEm,
    icon: 'cones',
    location: 'left'
  },
  {
    label: '图标',
    action: showIconCard,
    icon: 'game-ps',
    location: 'right'
  },
  {
    label: '主题',
    action: toggleTheme,
    icon: () => h(ThemeIcon),
    location: 'right'
  }
]

const leftToolBars = toolBars.filter((el) => el.location === 'left')
const rightToolBars = toolBars.filter((el) => el.location === 'right')
</script>

<style scoped lang="less">
.tool-bar {
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  height: 100%;
}

button {
  border: none;
  padding: 5px 5px;
  margin: auto 3px;
}

.tool-bar-title {
  font-size: 20px;
  font-weight: 400;
}
</style>
