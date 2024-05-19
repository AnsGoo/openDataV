<template>
  <Icon
    class="h-full inline-flex justify-center items-center"
    v-bind="$attrs"
    tag="span"
    :size="size"
    :color="iconColor"
  >
    <IconComponet />
  </Icon>
</template>

<script lang="ts" setup>
import { Icon } from '@vicons/utils'
import type { Component, ComputedRef } from 'vue'
import { computed, inject } from 'vue'

import iconMap from './icon-map'

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
  return darkTheme.value ? '#eeee' : '#333'
}
const iconColor = computed<string>(() => (props.color ? props.color : getIconColor()))
const IconComponet = computed<Component>(() => {
  return iconMap[props.name] ? iconMap[props.name] : iconMap['help']
})
</script>
