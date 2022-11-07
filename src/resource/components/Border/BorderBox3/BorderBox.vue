<template>
  <div v-resize="resizeHandler" class="dv-border-box-6">
    <svg class="dv-border-svg-container" :width="width" :height="height">
      <polygon
        :fill="propValue.base.backgroundColor"
        :points="`
          9, 7 ${width - 9}, 7 ${width - 9}, ${height - 7} 9, ${height - 7}
        `"
      />

      <circle :fill="propValue.base.colorRight" cx="5" cy="5" r="2" />
      <circle :fill="propValue.base.colorRight" :cx="width - 5" cy="5" r="2" />
      <circle :fill="propValue.base.colorRight" :cx="width - 5" :cy="height - 5" r="2" />
      <circle :fill="propValue.base.colorRight" cx="5" :cy="height - 5" r="2" />
      <polyline :stroke="propValue.base.colorLeft" :points="`10, 4 ${width - 10}, 4`" />
      <polyline
        :stroke="propValue.base.colorLeft"
        :points="`10, ${height - 4} ${width - 10}, ${height - 4}`"
      />
      <polyline :stroke="propValue.base.colorLeft" :points="`5, 70 5, ${height - 70}`" />
      <polyline
        :stroke="propValue.base.colorLeft"
        :points="`${width - 5}, 70 ${width - 5}, ${height - 70}`"
      />
      <polyline :stroke="propValue.base.colorLeft" :points="`3, 10, 3, 50`" />
      <polyline :stroke="propValue.base.colorLeft" :points="`7, 30 7, 80`" />
      <polyline :stroke="propValue.base.colorLeft" :points="`${width - 3}, 10 ${width - 3}, 50`" />
      <polyline :stroke="propValue.base.colorLeft" :points="`${width - 7}, 30 ${width - 7}, 80`" />
      <polyline
        :stroke="propValue.base.colorLeft"
        :points="`3, ${height - 10} 3, ${height - 50}`"
      />
      <polyline
        :stroke="propValue.base.colorLeft"
        :points="`7, ${height - 30} 7, ${height - 80}`"
      />
      <polyline
        :stroke="propValue.base.colorLeft"
        :points="`${width - 3}, ${height - 10} ${width - 3}, ${height - 50}`"
      />
      <polyline
        :stroke="propValue.base.colorLeft"
        :points="`${width - 7}, ${height - 30} ${width - 7}, ${height - 80}`"
      />
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
const resizeHandler = (entry: ResizeObserverEntry) => {
  const rect: DOMRectReadOnly = entry.contentRect
  width.value = rect.width
  height.value = rect.height
}
</script>

<style lang="less" scoped>
.dv-border-box-6 {
  // position: relative;
  width: 100%;
  height: 100%;
  // pointer-events: none;

  .dv-border-svg-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    & > polyline {
      fill: none;
      stroke-width: 1;
    }
  }
}
</style>
