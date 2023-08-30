<template>
  <o-tooltip>
    <template #trigger>
      <o-button quaternary size="small" :title="label" @click="action"> <IconComponent /></o-button>
    </template>
    <span>{{ label }}</span>
  </o-tooltip>
  <o-divider v-if="divider" vertical />
</template>
<script lang="ts" setup>
import { isString } from 'lodash-es'
import { OButton, ODivider, OTooltip } from 'open-data-v/ui'
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
