<template>
  <div class="dv-border-box-2" v-resize="resizeHandler">
    <svg class="dv-border-svg-container" :width="width" :height="height">
      <polygon
        :fill="propValue.backgroundColor"
        :points="`
          7, 7 ${width - 7}, 7 ${width - 7}, ${height - 7} 7, ${height - 7}
        `"
      />

      <polyline
        :stroke="propValue.color1"
        :points="`2, 2 ${width - 2} ,2 ${width - 2}, ${height - 2} 2, ${height - 2} 2, 2`"
      />
      <polyline
        :stroke="propValue.color2"
        :points="`6, 6 ${width - 6}, 6 ${width - 6}, ${height - 6} 6, ${height - 6} 6, 6`"
      />
      <circle :fill="propValue.color1" cx="11" cy="11" r="1" />
      <circle :fill="propValue.color1" :cx="width - 11" cy="11" r="1" />
      <circle :fill="propValue.color1" :cx="width - 11" :cy="height - 11" r="1" />
      <circle :fill="propValue.color1" cx="11" :cy="height - 11" r="1" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import type { ComponentInfo } from '@/types/component'
import { ref } from 'vue'
import type { BorderBox2 } from './type'

const width = ref<number>(150)
const height = ref<number>(150)

defineProps<{
  propValue: BorderBox2
  element: ComponentInfo
}>()

// 监听窗口大小变化
// 监听窗口大小变化

const resizeHandler = (entries) => {
  const entry = entries[0]
  const rect = entry.contentRect
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
    top: 0px;
    left: 0px;

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
