<template>
  <div class="dv-border-box-3" ref="mainEl">
    <svg class="dv-border-svg-container" :width="width" :height="height">
      <polygon
        :fill="backgroundColor"
        :points="`
        23, 23 ${width - 24}, 23 ${width - 24}, ${height - 24} 23, ${height - 24}
      `"
      />

      <polyline
        class="dv-bb3-line1"
        :stroke="mergedColor[0]"
        :points="`4, 4 ${width - 22} ,4 ${width - 22}, ${height - 22} 4, ${height - 22} 4, 4`"
      />
      <polyline
        class="dv-bb3-line2"
        :stroke="mergedColor[1]"
        :points="`10, 10 ${width - 16}, 10 ${width - 16}, ${height - 16} 10, ${height - 16} 10, 10`"
      />
      <polyline
        class="dv-bb3-line2"
        :stroke="mergedColor[1]"
        :points="`16, 16 ${width - 10}, 16 ${width - 10}, ${height - 10} 16, ${height - 10} 16, 16`"
      />
      <polyline
        class="dv-bb3-line2"
        :stroke="mergedColor[1]"
        :points="`22, 22 ${width - 4}, 22 ${width - 4}, ${height - 4} 22, ${height - 4} 22, 22`"
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

  return ['#2862b7', '#2862b7']
})

const backgroundColor = computed(() => {
  if (props.propValue.backgroundColor) {
    return props.propValue.backgroundColor
  }

  return 'transparent'
})
</script>

<style lang="less" scoped>
.dv-border-box-3 {
  // position: relative;
  width: 100%;
  height: 100%;
  pointer-events: none;

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

  .dv-bb3-line1 {
    stroke-width: 3;
  }

  .dv-bb3-line2 {
    stroke-width: 1;
  }
}
</style>
