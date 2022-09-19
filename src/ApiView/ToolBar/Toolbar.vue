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
        :is-button="item.isButton === undefined ? true : false"
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
import { importCanvas, exportCanvas, toggleTheme } from './modules/actions'
import ThemeIcon from './modules/themeSwitch/ThemeIcon.vue'
import ToolBarItem from './ToolBarItem.vue'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import LogoView from './modules/LogoView'
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
    icon: () => h(LogoView),
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
