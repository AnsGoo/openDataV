<template>
  <div v-resize="resizeHandler" class="dv-border-box-13">
    <svg class="dv-border-svg-container" :width="width" :height="height">
      <path
        :fill="propValue.base.backgroundColor"
        :stroke="propValue.base.colorLeft"
        :d="`
          M 5 20 L 5 10 L 12 3  L 60 3 L 68 10
          L ${width - 20} 10 L ${width - 5} 25
          L ${width - 5} ${height - 5} L 20 ${height - 5}
          L 5 ${height - 20} L 5 20
        `"
      />

      <path
        fill="transparent"
        stroke-width="3"
        stroke-linecap="round"
        stroke-dasharray="10 5"
        :stroke="propValue.base.colorLeft"
        :d="`M 16 9 L 61 9`"
      />

      <path
        fill="transparent"
        :stroke="propValue.base.colorRight"
        :d="`M 5 20 L 5 10 L 12 3  L 60 3 L 68 10`"
      />

      <path
        fill="transparent"
        :stroke="propValue.base.colorRight"
        :d="`M ${width - 5} ${height - 30} L ${width - 5} ${height - 5} L ${width - 30} ${
          height - 5
        }`"
      />
    </svg>

    <div class="border-box-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
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

const resizeHandler = (entry: ResizeObserverEntry) => {
  const rect: DOMRectReadOnly = entry.contentRect
  width.value = rect.width
  height.value = rect.height
}
</script>

<style lang="less" scoped>
.dv-border-box-13 {
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
  }

  .border-box-content {
    position: relative;
    width: 100%;
    height: 100%;
  }
}
</style>
