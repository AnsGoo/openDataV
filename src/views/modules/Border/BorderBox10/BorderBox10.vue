<template>
  <div
    class="dv-border-box-10"
    ref="mainEl"
    :style="`box-shadow: inset 0 0 25px 3px ${mergedColor[0]}`"
  >
    <svg class="dv-border-svg-container" :width="width" :height="height">
      <polygon
        :fill="backgroundColor"
        :points="`
        4, 0 ${width - 4}, 0 ${width}, 4 ${width}, ${height - 4} ${width - 4}, ${height}
        4, ${height} 0, ${height - 4} 0, 4
      `"
      />
    </svg>

    <svg
      :width="width"
      :height="height"
      :key="item"
      v-for="item in border"
      :class="`${item} dv-border-svg-container`"
    >
      <polygon :fill="mergedColor[1]" points="40, 0 5, 0 0, 5 0, 16 3, 19 3, 7 7, 3 35, 3" />
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

const border = ref<string[]>(['left-top', 'right-top', 'left-bottom', 'right-bottom'])
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

  return ['#1d48c4', '#d3e1f8']
})

const backgroundColor = computed(() => {
  if (props.propValue.backgroundColor) {
    return props.propValue.backgroundColor
  }

  return 'transparent'
})
</script>

<style lang="less" scoped>
.dv-border-box-10 {
  // position: relative;
  width: 100%;
  height: 100%;
  border-radius: 6px;
  pointer-events: none;

  .dv-border-svg-container {
    position: absolute;
    display: block;
  }

  .right-top {
    right: 0px;
    transform: rotateY(180deg);
  }

  .left-bottom {
    bottom: 0px;
    transform: rotateX(180deg);
  }

  .right-bottom {
    right: 0px;
    bottom: 0px;
    transform: rotateX(180deg) rotateY(180deg);
  }
}
</style>
