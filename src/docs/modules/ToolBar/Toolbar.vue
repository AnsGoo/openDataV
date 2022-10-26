<template>
  <ToolBar :bars="toolBars" />
</template>

<script setup lang="ts">
import { h } from 'vue'
import { useRouter } from 'vue-router'
import { toggleTheme } from './modules/actions'
import ThemeIcon from './modules/themeSwitch/ThemeIcon.vue'
import { ToolBar } from '@/components/ToolBar'
import type { ToolBarItemType } from '@/components/ToolBar'
import ActionDetail from './modules/ActionDetail.vue'
import Logo from './modules/Logo.vue'

const router = useRouter()
const emits = defineEmits<{
  (e: 'change', value: string): void
}>()

const toolBars: ToolBarItemType[] = [
  {
    label: '首页',
    action: (_e: MouseEvent) => {
      router.push({
        name: 'Pages'
      })
    },
    icon: () => h(Logo),
    divider: true,
    location: 'left'
  },
  {
    label: '教程',
    action: () => {
      emits('change', 'help')
      router.push({
        name: 'Help'
      })
    },
    icon: () =>
      h(ActionDetail, {
        icon: 'helpcenter',
        label: '教程'
      }),
    location: 'left'
  },
  {
    label: '组件',
    action: () => {
      emits('change', 'component')
      router.push({
        name: 'Component'
      })
    },
    icon: () =>
      h(ActionDetail, {
        icon: 'components',
        label: '组件'
      }),
    location: 'left'
  },
  {
    label: '数据',
    action: () => {
      emits('change', 'data')
      router.push({
        name: 'Data'
      })
    },
    icon: () =>
      h(ActionDetail, {
        icon: 'data',
        label: '数据'
      }),
    location: 'left'
  },
  {
    label: 'GitHub',
    action: toggleTheme,
    icon: 'doc-detail',
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
