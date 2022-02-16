<template>
  <div class="dv-border-box-4" ref="mainEl">
    <svg
      :class="`dv-border-svg-container ${reverse && 'dv-reverse'}`"
      :width="width"
      :height="height"
    >
      <polygon
        :fill="backgroundColor"
        :points="`
        ${width - 15}, 22 170, 22 150, 7 40, 7 28, 21 32, 24
        16, 42 16, ${height - 32} 41, ${height - 7} ${width - 15}, ${height - 7}
      `"
      />

      <polyline
        class="dv-bb4-line-1"
        :stroke="mergedColor[0]"
        :points="`145, ${height - 5} 40, ${height - 5} 10, ${height - 35}
          10, 40 40, 5 150, 5 170, 20 ${width - 15}, 20`"
      />
      <polyline
        :stroke="mergedColor[1]"
        class="dv-bb4-line-2"
        :points="`245, ${height - 1} 36, ${height - 1} 14, ${height - 23}
          14, ${height - 100}`"
      />

      <polyline
        class="dv-bb4-line-3"
        :stroke="mergedColor[0]"
        :points="`7, ${height - 40} 7, ${height - 75}`"
      />
      <polyline class="dv-bb4-line-4" :stroke="mergedColor[0]" :points="`28, 24 13, 41 13, 64`" />
      <polyline class="dv-bb4-line-5" :stroke="mergedColor[0]" :points="`5, 45 5, 140`" />
      <polyline class="dv-bb4-line-6" :stroke="mergedColor[1]" :points="`14, 75 14, 180`" />
      <polyline
        class="dv-bb4-line-7"
        :stroke="mergedColor[1]"
        :points="`55, 11 147, 11 167, 26 250, 26`"
      />
      <polyline class="dv-bb4-line-8" :stroke="mergedColor[1]" :points="`158, 5 173, 16`" />
      <polyline
        class="dv-bb4-line-9"
        :stroke="mergedColor[0]"
        :points="`200, 17 ${width - 10}, 17`"
      />
      <polyline
        class="dv-bb4-line-10"
        :stroke="mergedColor[1]"
        :points="`385, 17 ${width - 10}, 17`"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import type { ComponentInfo } from '@/types/component'
import { useResizeObserver } from '@vueuse/core'
import { computed, ref } from 'vue'

const mainEl = ref<ElRef>(null)
const width = ref<number>(150)
const height = ref<number>(150)

const props = defineProps<{
  propValue: Recordable<string>
  element: ComponentInfo
}>()

// 监听窗口大小变化
useResizeObserver(mainEl, (entries) => {
  const entry = entries[0]
  const rect = entry.contentRect
  width.value = rect.width
  height.value = rect.height
})

const mergedColor = computed(() => {
  const colorLeft = props.propValue.colorLeft
  const colorRight = props.propValue.colorRight
  if (colorLeft && colorRight) {
    return [colorLeft, colorRight]
  } else if (colorLeft) {
    return [colorLeft, colorLeft]
  } else if (colorRight) {
    return [colorRight, colorRight]
  }

  return ['red', 'rgba(0,0,255,0.8)']
})

const backgroundColor = computed(() => {
  if (props.propValue.backgroundColor) {
    return props.propValue.backgroundColor
  }

  return 'transparent'
})

const reverse = computed(() => {
  if (props.propValue.reverse) {
    return props.propValue.reverse
  }

  return false
})
</script>

<style lang="less" scoped>
.dv-border-box-4 {
  // position: relative;
  width: 100%;
  height: 100%;
  pointer-events: none;

  .dv-reverse {
    transform: rotate(180deg);
  }

  .dv-border-svg-container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;

    & > polyline {
      fill: none;
    }
  }

  .sw1 {
    stroke-width: 1;
  }

  .sw3 {
    stroke-width: 3px;
    stroke-linecap: round;
  }

  .dv-bb4-line-1 {
    .sw1;
  }

  .dv-bb4-line-2 {
    .sw1;
  }

  .dv-bb4-line-3 {
    .sw3;
  }

  .dv-bb4-line-4 {
    .sw3;
  }

  .dv-bb4-line-5 {
    .sw1;
  }

  .dv-bb4-line-6 {
    .sw1;
  }

  .dv-bb4-line-7 {
    .sw1;
  }

  .dv-bb4-line-8 {
    .sw3;
  }

  .dv-bb4-line-9 {
    .sw3;
    stroke-dasharray: 100 250;
  }

  .dv-bb4-line-10 {
    .sw1;
    stroke-dasharray: 80 270;
  }
}
</style>
