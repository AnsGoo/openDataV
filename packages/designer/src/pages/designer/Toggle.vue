<template>
  <span class="absolute toggle z-50 bg-gray-100 dark:bg-stone-700">
    <CheveronRight v-if="viewSymbol === 'right'" />
    <CheveronLeft v-else />
  </span>
</template>

<script setup lang="ts">
import { OIcon } from '@open-data-v/ui'
import { computed } from 'vue'

const CheveronRight = OIcon.CheveronRight
const CheveronLeft = OIcon.CheveronLeft

const props = withDefaults(
  defineProps<{
    direction?: 'left' | 'right'
    location?: 'left' | 'right'
    x?: string
    y?: string
  }>(),
  {
    direction: 'left',
    x: '50%',
    y: '50%',
    location: 'left'
  }
)
const viewSymbol = computed<string>(() => {
  if (props.location === 'left') {
    return props.direction === 'left' ? 'left' : 'right'
  } else {
    return props.direction === 'left' ? 'left' : 'right'
  }
})
const top = computed<string>(() => props.y || '50%')
const left = computed<string>(() =>
  props.location === 'left' ? `calc(${props.x} - 10px)` : 'unset'
)
const right = computed<string>(() =>
  props.location === 'right' ? `calc(${props.x} - 10px)` : 'unset'
)
</script>
<style scoped lang="less">
.toggle {
  transition-property: left, right;
  transition-duration: 0.5s;
  top: v-bind(top);
  left: v-bind(left);
  right: v-bind(right);
  border: 1px solid;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  font-size: 10px;
  align-content: center;
  display: inline-block;
  margin: 0 auto;
  text-align: center;
  font-weight: bold;
  box-shadow: 0 2px 4px 0px rgba(0, 0, 0, 0.06);
}
</style>
