<template>
  <div
    ref="container"
    class="cursor-pointer absolute top-0 left-0 right-0 bottom-0"
    :style="{ background: bgColor }"
    @mousedown="handleMouseDown"
    @touchmove="handleChange"
    @touchstart="handleChange"
  >
    <div
      class="cursor-pointer absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-r from-[#fff] to-[rgba(255,255,255,0)]"
    ></div>
    <div
      class="cursor-pointer absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-[#000] to-[rgba(0,0,0,0)]"
    ></div>
    <div class="cursor-pointer absolute" :style="{ top: pointerTop, left: pointerLeft }">
      <div class="vc-saturation-circle"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'

import type { ColorOption } from './types'

const props = defineProps<{
  value: ColorOption
}>()
const emit = defineEmits<{
  (e: 'change', value: Pick<ColorOption, 'hsv'>): void
  (e: 'update:value', value: ColorOption): void
}>()
const bgColor = computed<string>(() => {
  return `hsl(${props.value.hsv.h}, 100%, 50%)`
})
const pointerTop = computed<string>(() => `${-(props.value.hsv.v * 100) + 1 + 100}%`)
const pointerLeft = computed<string>(() => `${props.value.hsv.s * 100}%`)
const container = ref<HTMLDivElement | null>(null)

function clamp(value, min, max) {
  return min < max
    ? value < min
      ? min
      : value > max
      ? max
      : value
    : value < max
    ? max
    : value > min
    ? min
    : value
}

function handleChange(e) {
  e.preventDefault()
  if (!container.value) {
    // for some edge cases, container may not exist. see #220
    return
  }
  const containerWidth = container.value.clientWidth
  const containerHeight = container.value.clientHeight

  const xOffset = container.value.getBoundingClientRect().left + window.pageXOffset
  const yOffset = container.value.getBoundingClientRect().top + window.pageYOffset
  const pageX = e.pageX || (e.touches ? e.touches[0].pageX : 0)
  const pageY = e.pageY || (e.touches ? e.touches[0].pageY : 0)
  const left = clamp(pageX - xOffset, 0, containerWidth)
  const top = clamp(pageY - yOffset, 0, containerHeight)
  const saturation = left / containerWidth
  const bright = clamp(-(top / containerHeight) + 1, 0, 1)

  onChange({
    h: props.value.hsv.h,
    s: saturation,
    v: bright,
    a: props.value.hsv.a,
    source: 'hsva'
  })
}
function onChange(param) {
  emit('change', param)
  emit('update:value', param)
}
function handleMouseDown(_e) {
  // this.handleChange(e, true)
  window.addEventListener('mousemove', handleChange)
  window.addEventListener('mouseup', handleChange)
  window.addEventListener('mouseup', handleMouseUp)
}
function handleMouseUp(_e) {
  unbindEventListeners()
}
function unbindEventListeners() {
  window.removeEventListener('mousemove', handleChange)
  window.removeEventListener('mouseup', handleChange)
  window.removeEventListener('mouseup', handleMouseUp)
}

onUnmounted(() => {
  unbindEventListeners
})
</script>

<style>
.vc-saturation-circle {
  cursor: pointer;
  width: 4px;
  height: 4px;
  box-shadow: 0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0, 0, 0, 0.3), 0 0 1px 2px rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  transform: translate(-2px, -2px);
}
</style>
