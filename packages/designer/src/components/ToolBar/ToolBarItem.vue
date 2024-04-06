<template>
  <o-tooltip :content="label">
    <o-button :bordered="false" size="small" :title="label" @click="action">
      <IconComponent
    /></o-button>
  </o-tooltip>
  <o-divider v-if="divider" vertical />
</template>
<script lang="ts" setup>
import { OButton, ODivider, OTooltip } from '@open-data-v/ui'
import { isString } from 'lodash-es'
import type { ComponentOptions, VNode } from 'vue'
import { computed, getCurrentInstance, h } from 'vue'

import type { IconNode, ToolBarItemType } from './type'

const props = withDefaults(
  defineProps<{
    label: string
    action: (e: MouseEvent) => void
    disable?: (e: MouseEvent) => void
    icon: string | IconNode
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
    : (props.icon as IconNode)()
)
</script>
