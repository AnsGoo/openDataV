<template>
  <div class="dv-border-box-6" ref="mainEl">
    <svg class="dv-border-svg-container" :width="width" :height="height">
      <polygon
        :fill="backgroundColor"
        :points="`
        9, 7 ${width - 9}, 7 ${width - 9}, ${height - 7} 9, ${height - 7}
      `"
      />

      <circle :fill="mergedColor[1]" cx="5" cy="5" r="2" />
      <circle :fill="mergedColor[1]" :cx="width - 5" cy="5" r="2" />
      <circle :fill="mergedColor[1]" :cx="width - 5" :cy="height - 5" r="2" />
      <circle :fill="mergedColor[1]" cx="5" :cy="height - 5" r="2" />
      <polyline :stroke="mergedColor[0]" :points="`10, 4 ${width - 10}, 4`" />
      <polyline
        :stroke="mergedColor[0]"
        :points="`10, ${height - 4} ${width - 10}, ${height - 4}`"
      />
      <polyline :stroke="mergedColor[0]" :points="`5, 70 5, ${height - 70}`" />
      <polyline
        :stroke="mergedColor[0]"
        :points="`${width - 5}, 70 ${width - 5}, ${height - 70}`"
      />
      <polyline :stroke="mergedColor[0]" :points="`3, 10, 3, 50`" />
      <polyline :stroke="mergedColor[0]" :points="`7, 30 7, 80`" />
      <polyline :stroke="mergedColor[0]" :points="`${width - 3}, 10 ${width - 3}, 50`" />
      <polyline :stroke="mergedColor[0]" :points="`${width - 7}, 30 ${width - 7}, 80`" />
      <polyline :stroke="mergedColor[0]" :points="`3, ${height - 10} 3, ${height - 50}`" />
      <polyline :stroke="mergedColor[0]" :points="`7, ${height - 30} 7, ${height - 80}`" />
      <polyline
        :stroke="mergedColor[0]"
        :points="`${width - 3}, ${height - 10} ${width - 3}, ${height - 50}`"
      />
      <polyline
        :stroke="mergedColor[0]"
        :points="`${width - 7}, ${height - 30} ${width - 7}, ${height - 80}`"
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

  return ['rgba(255, 255, 255, 0.35)', 'gray']
})

const backgroundColor = computed(() => {
  if (props.propValue.backgroundColor) {
    return props.propValue.backgroundColor
  }

  return 'transparent'
})
</script>

<style lang="less" scoped>
.dv-border-box-6 {
  // position: relative;
  width: 100%;
  height: 100%;
  // pointer-events: none;

  .dv-border-svg-container {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;

    & > polyline {
      fill: none;
      stroke-width: 1;
    }
  }
}
</style>
