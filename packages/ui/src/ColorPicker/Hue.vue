<template>
  <div class="w-full h-full absolute top-0 right-0 bottom-0 left-0 rounded-xl" :class="[directionClass]">
    <div
      ref="container"
      class="cursor-pointer relative h-full mx-1"
      role="slider"
      :aria-valuenow="value.hsl.h"
      aria-valuemin="0"
      aria-valuemax="360"
      @mousedown="handleMouseDown"
      @touchmove="handleChange"
      @touchstart="handleChange"
    >
      <div
        class="cursor-pointer relative h-full w-1.5"
        :style="{ top: pointerTop, left: pointerLeft }"
        role="presentation"
      >
        <div
          class="cursor-pointer w-full shadow-inner h-full border-gray-500 dark:border-gray-50 rounded border dark:bg-gray-500 bg-gray-50"
        ></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'

import type { ColorOption } from './types'

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
  (e: 'update:value', value: ColorOption): void
}>()

const props = withDefaults(
  defineProps<{
    value: ColorOption
    direction?: string
  }>(),
  {
    direction: 'horizontal'
  }
)

const pullDirection = ref<string>('')
const container = ref<HTMLDivElement | null>(null)
const directionClass = computed(() => {
  return {
    'vc-hue--horizontal': props.direction === 'horizontal',
    'vc-hue--vertical': props.direction === 'vertical'
  }
})

const pointerTop = computed<string>(() => {
  if (props.direction === 'vertical') {
    if (props.value.hsl.h === 0 && pullDirection.value === 'right') {
      return '0%'
    }
    return `${-((props.value.hsl.h * 100) / 360) + 100}%`
  }
  return '0%'
})

const pointerLeft = computed<string>(() => {
  if (props.direction === 'vertical') {
    return '0%'
  }
  if (props.value.hsl.h === 0 && pullDirection.value === 'right') {
    return '100%'
  }
  return `${(props.value.hsl.h * 100) / 360}%`
})

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
  const left = pageX - xOffset
  const top = pageY - yOffset

  let h
  let percent

  if (props.direction === 'vertical') {
    if (top < 0) {
      h = 360
    } else if (top > containerHeight) {
      h = 0
    } else {
      percent = -((top * 100) / containerHeight) + 100
      h = (360 * percent) / 100
    }

    if (props.value.hsl.h !== h) {
      emit('change', {
        h,
        s: props.value.hsl.s,
        l: props.value.hsl.l,
        a: props.value.hsl.a,
        source: 'hsl'
      })
    }
  } else {
    if (left < 0) {
      h = 0
    } else if (left > containerWidth) {
      h = 360
    } else {
      percent = (left * 100) / containerWidth
      h = (360 * percent) / 100
    }

    if (props.value.hsl.h !== h) {
      emit('change', {
        h,
        s: props.value.hsl.s,
        l: props.value.hsl.l,
        a: props.value.hsl.a,
        source: 'hsl'
      })
    }
  }
}
function handleMouseDown(e) {
  handleChange(e)
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
.vc-hue--horizontal {
  background: linear-gradient(
    to right,
    #f00 0%,
    #ff0 17%,
    #0f0 33%,
    #0ff 50%,
    #00f 67%,
    #f0f 83%,
    #f00 100%
  );
}
.vc-hue--vertical {
  background: linear-gradient(
    to top,
    #f00 0%,
    #ff0 17%,
    #0f0 33%,
    #0ff 50%,
    #00f 67%,
    #f0f 83%,
    #f00 100%
  );
}
</style>
