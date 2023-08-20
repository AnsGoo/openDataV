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
import { isString } from 'lodash-es'
import { NButton, NDivider, NTooltip } from 'naive-ui'
import type { ComponentOptions, VNode } from 'vue'
import { computed, getCurrentInstance, h } from 'vue'

import type { iconNode, ToolBarItemType } from './type'

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

const instance = getCurrentInstance()
const XIcon = instance!.appContext.components['XIcon']

const IconComponent = computed<ComponentOptions>(() =>
  isString(props.icon)
    ? h(XIcon, {
        name: props.icon,
        size: 24
      })
    : (props.icon as iconNode)()
)
</script>
<style lang="less" scoped></style>
