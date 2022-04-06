<template>
  <div
    class="dv-border-box-7"
    :style="`box-shadow: inset 0 0 40px ${mergedColor[0]}; border: 1px solid ${mergedColor[0]}; background-color: ${backgroundColor}`"
    ref="mainEl"
  >
    <svg class="dv-border-svg-container" :width="width" :height="height">
      <polyline class="dv-bb7-line-width-2" :stroke="mergedColor[0]" :points="`0, 25 0, 0 25, 0`" />
      <polyline
        class="dv-bb7-line-width-2"
        :stroke="mergedColor[0]"
        :points="`${width - 25}, 0 ${width}, 0 ${width}, 25`"
      />
      <polyline
        class="dv-bb7-line-width-2"
        :stroke="mergedColor[0]"
        :points="`${width - 25}, ${height} ${width}, ${height} ${width}, ${height - 25}`"
      />
      <polyline
        class="dv-bb7-line-width-2"
        :stroke="mergedColor[0]"
        :points="`0, ${height - 25} 0, ${height} 25, ${height}`"
      />

      <polyline class="dv-bb7-line-width-5" :stroke="mergedColor[1]" :points="`0, 10 0, 0 10, 0`" />
      <polyline
        class="dv-bb7-line-width-5"
        :stroke="mergedColor[1]"
        :points="`${width - 10}, 0 ${width}, 0 ${width}, 10`"
      />
      <polyline
        class="dv-bb7-line-width-5"
        :stroke="mergedColor[1]"
        :points="`${width - 10}, ${height} ${width}, ${height} ${width}, ${height - 10}`"
      />
      <polyline
        class="dv-bb7-line-width-5"
        :stroke="mergedColor[1]"
        :points="`0, ${height - 10} 0, ${height} 10, ${height}`"
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

  return ['rgba(128,128,128,0.3)', 'rgba(128,128,128,0.5)']
})

const backgroundColor = computed(() => {
  if (props.propValue.backgroundColor) {
    return props.propValue.backgroundColor
  }

  return 'transparent'
})
</script>

<style lang="less" scoped>
.dv-border-box-7 {
  // position: relative;
  width: 100%;
  height: 100%;
  pointer-events: none;

  .dv-border-svg-container {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;

    & > polyline {
      fill: none;
      stroke-linecap: round;
    }
  }

  .dv-bb7-line-width-2 {
    stroke-width: 2;
  }

  .dv-bb7-line-width-5 {
    stroke-width: 5;
  }
}
</style>
