<template>
  <n-tooltip>
    <template #trigger>
      <n-button quaternary size="small" @click="action" :title="label" v-if="isButton">
        <IconComponent
      /></n-button>
      <IconComponent v-else class="bar" />
    </template>
    <span>{{ label }}</span>
  </n-tooltip>
  <n-divider vertical v-if="divider" />
</template>
<script lang="ts" setup>
import { NButton, NTooltip, NDivider } from 'naive-ui'
import { computed, h, VNode } from 'vue'
import { iconNode, ToolBarItemType } from './modules/types'
import { IconPark } from '@/plugins/icon'
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

const IconComponent = computed<VNode>(() =>
  typeof props.icon === 'string'
    ? h(IconPark, {
        name: props.icon,
        size: '24'
      })
    : (props.icon as iconNode)()
)
</script>
<style lang="less" scoped></style>
