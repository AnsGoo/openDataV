<template>
  <n-tooltip>
    <template #trigger>
      <n-button quaternary size="small" :title="label" @click="action"> <IconComponent /></n-button>
    </template>
    <span>{{ label }}</span>
  </n-tooltip>
  <n-divider v-if="divider" vertical />
</template>
<script lang="ts" setup>
import { NButton, NTooltip, NDivider } from 'naive-ui'
import type { VNode, ComponentOptions } from 'vue'
import { computed, h } from 'vue'
import type { iconNode, ToolBarItemType } from './type'
import { XIcon } from '@/plugins/xicon'
const props = withDefaults(
  defineProps<{
    label: string
    action: (e: MouseEvent) => void
    disable?: (e: MouseEvent) => void
    icon: string | Function
    divider?: boolean | undefined
    children?: ToolBarItemType[]
    otherShow?: VNode
    isButton?: boolean
  }>(),
  {
    disable: () => false,
    div: false,
    isButton: true
  }
)

const IconComponent = computed<ComponentOptions>(() =>
  typeof props.icon === 'string'
    ? h(XIcon, {
        name: props.icon,
        size: 24
      })
    : (props.icon as iconNode)()
)
</script>
<style lang="less" scoped></style>
