<template>
  <span v-resize="resizeHandler">{{ customeText }}</span>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import dayjs from 'dayjs'
import type { DateText } from './type'

const props = defineProps<{
  componentId: string
  propValue: DateText
}>()
const lineHeight = ref<string>('20px')
const resizeHandler = (entries: ResizeObserverEntry[]) => {
  const entry = entries[0]
  const { height } = entry.contentRect
  lineHeight.value = `${height}px`
}
let intervalId: IntervalHandle
const customeText = ref<string>(dayjs().format(props.propValue.format || 'YYYY-MM-DD HH:mm:ss'))

const updateData = () => {
  const newformat: string = props.propValue.format
  customeText.value = dayjs().format(newformat || 'YYYY-MM-DD HH:mm:ss')
}
onMounted(() => {
  intervalId = setInterval(updateData, 1000)
})

onUnmounted(() => {
  clearInterval(intervalId)
})
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
