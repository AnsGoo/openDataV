<template>
  <Icon class="icon" v-bind="$attrs" tag="span" :size="size" :color="iconColor">
    <IconComponet />
  </Icon>
</template>

<script lang="ts" setup>
import { Help } from '@vicons/carbon'
import { Icon } from '@vicons/utils'
import type { Component, ComputedRef } from 'vue'
import { computed, inject } from 'vue'

import icons from './icons'

const darkTheme = inject<ComputedRef<boolean>>(
  'DarkTheme',
  computed(() => true)
)
const props = withDefaults(
  defineProps<{
    name: string
    size?: number
    color?: string
  }>(),
  {
    size: 25,
    color: ''
  }
)
const getIconColor = () => {
  return darkTheme.value ? '#eeeee' : '#333'
}
const iconColor = computed<string>(() => (props.color ? props.color : getIconColor()))
const IconComponet = computed<Component>(() => {
  return icons[props.name] ? icons[props.name] : Help
})
</script>

<style lang="less" scoped>
.icon {
  @apply h-full inline-flex justify-center items-center;
}
</style>
