<template>
  <ToolBar :bars="toolBars" />
</template>

<script setup lang="ts">
import { h } from 'vue'
import { useRouter } from 'vue-router'

import type { ToolBarItemType } from '@/components/ToolBar'
import { ToolBar } from '@/components/ToolBar'
import docsRouters from '@/router/modules/docs'

import ActionDetail from './modules/ActionDetail.vue'
import { toggleTheme } from './modules/actions'
import Logo from './modules/Logo.vue'
import ThemeIcon from './modules/themeSwitch/ThemeIcon.vue'

const router = useRouter()
const emits = defineEmits<{
  (e: 'change', value: string): void
}>()

const leftBars: ToolBarItemType[] = docsRouters[0].children.map((el) => {
  return {
    label: el.meta.title,
    action: async () => {
      emits('change', 'help')
      await router.push({
        name: el.name
      })
    },
    icon: () =>
      h(ActionDetail, {
        icon: el.meta.icon,
        label: el.meta.title
      }),
    location: 'left'
  }
})
const toolBars: ToolBarItemType[] = [
  {
    label: '首页',
    action: async (_e: MouseEvent) => {
      await router.push({
        name: 'Pages'
      })
    },
    icon: () => h(Logo),
    divider: true,
    location: 'left'
  },
  ...leftBars,
  {
    label: 'GitHub',
    action: () => {
      window.open('https://github.com/AnsGoo/openDataV', '_blank')
    },
    icon: 'github',
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
.tool-bar-title {
  font-size: 20px;
  font-weight: 400;
}
</style>
