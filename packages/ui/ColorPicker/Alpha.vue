<template>
  <div class="absolute top-0 left-0 bottom-0 right-0 rounded-xl">
    <div
      class="absolute top-0 left-0 bottom-0 right-0 rounded-xl"
      :style="{ background: gradientColor }"
    ></div>
    <div
      ref="container"
      class="cursor-pointer relative h-full mx-1 z-10"
      @mousedown="handleMouseDown"
      @touchmove="(e) => handleChange(e, false)"
      @touchstart="(e) => handleChange(e, false)"
    >
      <div class="z-20 absolute h-full w-1.5" :style="{ left: `${value.a * 100}%` }">
        <div
          class="cursor-pointer shadow-inner rounded border-gray-500 dark:bg-gray-500 dark:border-gray-50 border bg-gray-50 h-full w-full"
        ></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'

import type { ColorOption } from './types'

const props = defineProps<{
  value: ColorOption
}>()
const container = ref<HTMLElement | null>(null)

const gradientColor = computed<string>(() => {
  const { rgba } = props.value
  const rgbStr = [rgba.r, rgba.g, rgba.b].join(',')
  return `linear-gradient(to right, rgba(${rgbStr}, 0) 0%, rgba(${rgbStr}, 1) 100%)`
})
const emit = defineEmits<{
  (
    e: 'change',
    value: {
      h: number
      s: number
      a: number
      l: number
      source: string
    }
  ): void
}>()
function handleChange(e, skip = false) {
  !skip && e.preventDefault()
  if (!container.value) {
    return
  }
  const containerWidth = container.value.clientWidth

  const xOffset = container.value.getBoundingClientRect().left + window.pageXOffset
  const pageX = e.pageX || (e.touches ? e.touches[0].pageX : 0)
  const left = pageX - xOffset

  let a
  if (left < 0) a = 0
  else if (left > containerWidth) a = 1
  else a = Number((Math.round((left * 100) / containerWidth) / 100).toFixed(2))
  if (props.value.a !== a) {
    emit('change', {
      h: props.value.hsl.h,
      s: props.value.hsl.s,
      l: props.value.hsl.l,
      a,
      source: 'rgba'
    })
  }
}

function handleMouseDown(e) {
  handleChange(e, true)
  window.addEventListener('mousemove', handleChange)
  window.addEventListener('mouseup', handleMouseUp)
}
function handleMouseUp() {
  unbindEventListeners()
}
function unbindEventListeners() {
  window.removeEventListener('mousemove', handleChange)
  window.removeEventListener('mouseup', handleMouseUp)
}
onUnmounted(() => {
  unbindEventListeners()
})
</script>
