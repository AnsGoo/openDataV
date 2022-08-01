<template>
  <span v-if="propValue.type === 'text'" v-resize="resizeHandler">{{ customeText }}</span>
  <span
    v-else-if="propValue.type === 'symbol'"
    :class="['icon', 'iconfont', customeText]"
    v-resize="resizeHandler"
  ></span>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { StaticText } from './type'

const props = defineProps<{
  componentId: string
  propValue: StaticText
}>()

const customeText = computed<string>(() => {
  return props.propValue.text
})

const lineHeight = ref<string>('20px')
const resizeHandler = (entries: ResizeObserverEntry[]) => {
  const entry = entries[0]
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
