<template>
  <div v-resize="resizeHandler" class="dv-border-box-2">
    <svg class="dv-border-svg-container" :width="width" :height="height">
      <polygon
        :fill="propValue.base.backgroundColor"
        :points="`
          7, 7 ${width - 7}, 7 ${width - 7}, ${height - 7} 7, ${height - 7}
        `"
      />

      <polyline
        :stroke="propValue.base.color1"
        :points="`2, 2 ${width - 2} ,2 ${width - 2}, ${height - 2} 2, ${height - 2} 2, 2`"
      />
      <polyline
        :stroke="propValue.base.color2"
        :points="`6, 6 ${width - 6}, 6 ${width - 6}, ${height - 6} 6, ${height - 6} 6, 6`"
      />
      <circle :fill="propValue.base.color1" cx="11" cy="11" r="1" />
      <circle :fill="propValue.base.color1" :cx="width - 11" cy="11" r="1" />
      <circle :fill="propValue.base.color1" :cx="width - 11" :cy="height - 11" r="1" />
      <circle :fill="propValue.base.color1" cx="11" :cy="height - 11" r="1" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { useProp } from '@/resource/hooks'
import { ref } from 'vue'
import type BorderBoxComponent from './config'
import type { BorderBox } from './type'

const props = defineProps<{
  component: BorderBoxComponent
}>()

const { propValue } = useProp<BorderBox>(props.component)
const width = ref<number>(150)
const height = ref<number>(150)

// 监听窗口大小变化
// 监听窗口大小变化

const resizeHandler = (entry: ResizeObserverEntry) => {
  const rect: DOMRectReadOnly = entry.contentRect
  width.value = rect.width
  height.value = rect.height
}
</script>

<style lang="less" scoped>
.dv-border-box-2 {
  // position: relative;
  width: 100%;
  height: 100%;
  pointer-events: none;

  .dv-border-svg-container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;

    & > polyline {
      fill: none;
      stroke-width: 1;
    }
  }

  .border-box-content {
    position: relative;
    width: 100%;
    height: 100%;
  }
}
</style>
