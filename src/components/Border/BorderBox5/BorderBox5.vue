<template>
  <div class="dv-border-box-5" ref="mainEl">
    <svg
      :class="`dv-border-svg-container  ${reverse && 'dv-reverse'}`"
      :width="width"
      :height="height"
    >
      <polygon
        :fill="backgroundColor"
        :points="`
        10, 22 ${width - 22}, 22 ${width - 22}, ${height - 86} ${width - 84}, ${height - 24} 10, ${
          height - 24
        }
      `"
      />

      <polyline
        class="dv-bb5-line-1"
        :stroke="mergedColor[0]"
        :points="`8, 5 ${width - 5}, 5 ${width - 5}, ${height - 100}
          ${width - 100}, ${height - 5} 8, ${height - 5} 8, 5`"
      />
      <polyline
        class="dv-bb5-line-2"
        :stroke="mergedColor[1]"
        :points="`3, 5 ${width - 20}, 5 ${width - 20}, ${height - 60}
          ${width - 74}, ${height - 5} 3, ${height - 5} 3, 5`"
      />
      <polyline
        class="dv-bb5-line-3"
        :stroke="mergedColor[1]"
        :points="`50, 13 ${width - 35}, 13`"
      />
      <polyline
        class="dv-bb5-line-4"
        :stroke="mergedColor[1]"
        :points="`15, 20 ${width - 35}, 20`"
      />
      <polyline
        class="dv-bb5-line-5"
        :stroke="mergedColor[1]"
        :points="`15, ${height - 20} ${width - 110}, ${height - 20}`"
      />
      <polyline
        class="dv-bb5-line-6"
        :stroke="mergedColor[1]"
        :points="`15, ${height - 13} ${width - 110}, ${height - 13}`"
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

  return ['rgba(255, 255, 255, 0.35)', 'rgba(255, 255, 255, 0.20)']
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
.dv-border-box-5 {
  // position: relative;
  width: 100%;
  height: 100%;
  pointer-events: none;

  .dv-reverse {
    transform: rotate(180deg);
  }

  .dv-border-svg-container {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;

    & > polyline {
      fill: none;
    }
  }

  .dv-bb5-line-1,
  .dv-bb5-line-2 {
    stroke-width: 1;
  }

  .dv-bb5-line-3,
  .dv-bb5-line-6 {
    stroke-width: 5;
  }

  .dv-bb5-line-4,
  .dv-bb5-line-5 {
    stroke-width: 2;
  }
}
</style>
