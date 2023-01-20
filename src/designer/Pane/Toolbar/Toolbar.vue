<template>
  <ToolBar :bars="toolBars">
    <div class="tool-bar-title">{{ basicStore.name }}</div>
  </ToolBar>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { ToolBarItemType } from '@/components/ToolBar'
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

import LogoView from '@/components/LogoView'
import { ToolBar } from '@/components/ToolBar'
import { useBasicStoreWithOut } from '@/store/modules/basic'
const basicStore = useBasicStoreWithOut()

const router = useRouter()
const route = useRoute()

const toolBars: ToolBarItemType[] = [
  {
    label: '首页',
    action: async (_e: MouseEvent) => {
      await router.push({
        name: 'Pages'
      })
    },
    icon: () =>
      h(LogoView, {
        width: '40px'
      }),
    divider: true
  },
  {
    label: '保存',
    action: () => showSaveCard(route.params.index as string),
    icon: 'save'
  },
  {
    label: '预览',
    action: (_e: MouseEvent) => {
      const { href } = router.resolve('/preview')
      window.open(href, '_blank')
    },
    icon: 'preview'
  },
  {
    label: '撤销',
    action: undo,
    icon: 'back'
  },
  {
    label: '恢复',
    action: recoveryDraft,
    icon: 'next'
  },
  {
    label: '导出',
    action: () => exportCanvas((route.params.index as string) || ''),
    icon: 'download'
  },
  {
    label: '导入',
    action: importCanvas,
    icon: 'upload'
  },
  {
    label: '全屏',
    action: () => {
      const el: HTMLElement | null = document.querySelector('#editor')
      if (document.fullscreenEnabled && el) {
        el.requestFullscreen()
      }
    },
    icon: 'fullScreen'
  },
  {
    label: '坐标',
    action: setShowEm,
    icon: 'axis'
  },
  {
    label: '图标',
    action: showIconCard,
    icon: 'cube',
    location: 'right'
  },
  {
    label: '主题',
    action: toggleTheme,
    icon: () => h(ThemeIcon),
    location: 'right'
  },
  {
    label: 'GitHub',
    action: () => {
      window.open('https://github.com/AnsGoo/openDataV', '_blank')
    },
    icon: 'github',
    location: 'right'
  }
]
</script>

<style scoped lang="less">
.tool-bar-title {
  font-size: 20px;
  font-weight: 400;
}
</style>
