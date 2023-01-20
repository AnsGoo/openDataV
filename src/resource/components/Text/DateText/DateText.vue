<template>
  <span v-resize="resizeHandler">{{ customText }}</span>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import dayjs from 'dayjs'
import type DateTextComponent from './config'
import { useProp } from '@/resource/hooks'
import type { DateText } from './type'

const props = defineProps<{
  component: DateTextComponent
}>()
const { propValue } = useProp<DateText>(props.component)
const lineHeight = ref<string>('20px')
const resizeHandler = (entry: ResizeObserverEntry) => {
  const { height } = entry.contentRect
  lineHeight.value = `${height}px`
}
let intervalId: IntervalHandle
const customText = ref<string>(dayjs().format(propValue.base.format || 'YYYY-MM-DD HH:mm:ss'))

const updateData = () => {
  const newFormat: string = propValue.base.format
  customText.value = dayjs().format(newFormat || 'YYYY-MM-DD HH:mm:ss')
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
