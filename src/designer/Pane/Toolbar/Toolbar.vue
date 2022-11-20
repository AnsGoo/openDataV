<template>
  <ToolBar :bars="toolBars">
    <div class="tool-bar-title">{{ basicStore.name }}</div>
    <SavePage v-model:show="showDialog" :index="route.params.index" />
    <IconPage v-model:show="showIconDialog" />
  </ToolBar>
</template>

<script setup lang="ts">
import { defineAsyncComponent, h, ref } from 'vue'
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

import LogoView from '@/components/LogoView'
import { ToolBar } from '@/components/ToolBar'
import { useBasicStoreWithOut } from '@/store/modules/basic'
const basicStore = useBasicStoreWithOut()

const router = useRouter()
const route = useRoute()

const SavePage = defineAsyncComponent(() => import('./modules/save/SavePage.vue'))
const showDialog = ref(false)
const IconPage = defineAsyncComponent(() => import('./modules/iconList/IconFont.vue'))
const showIconDialog = ref(false)

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
    divider: true
  },
  {
    label: '保存',
    action: () => {
      showDialog.value = true
    },
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
    action: () => {
      showIconDialog.value = true
    },
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
