<template>
  <span v-if="propValue.base.type === 'text'" v-resize="resizeHandler">{{ customeText }}</span>
  <span
    v-else-if="propValue.base.type === 'symbol'"
    v-resize="resizeHandler"
    :class="['icon', 'iconfont', customeText]"
  ></span>
</template>

<script setup lang="ts">
import { useProp } from '@open-data-v/base'
import { computed, ref } from 'vue'

import type StaticTextComponent from './config'
import type { StaticTextType } from './type'

const props = defineProps<{
  component: StaticTextComponent
}>()

const { propValue } = useProp<StaticTextType>(props.component)

const customeText = computed<string>(() => {
  return propValue.base.text
})

const lineHeight = ref<string>('20px')
const resizeHandler = (entry: ResizeObserverEntry) => {
  const { height } = entry.contentRect
  lineHeight.value = `${height}px`
}
</script>

<style lang="less" scoped>
span {
  display: inline-block;
  width: 100%;
  text-align: center;
  pointer-events: none;
  line-height: v-bind(lineHeight);
}
</style>
