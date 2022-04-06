<template>
  <div class="dv-border-box-13" v-resize="resizeHandler">
    <svg class="dv-border-svg-container" :width="width" :height="height">
      <path
        :fill="propValue.backgroundColor"
        :stroke="propValue.colorLeft"
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
        :stroke="propValue.colorLeft"
        :d="`M 16 9 L 61 9`"
      />

      <path
        fill="transparent"
        :stroke="propValue.colorRight"
        :d="`M 5 20 L 5 10 L 12 3  L 60 3 L 68 10`"
      />

      <path
        fill="transparent"
        :stroke="propValue.colorRight"
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
import { ref } from 'vue'

import type { BorderBox13 } from './type'

const width = ref<number>(150)
const height = ref<number>(150)

defineProps<{
  componentId: string
  propValue: BorderBox13
}>()

const resizeHandler = (entries) => {
  const entry = entries[0]
  const rect = entry.contentRect
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
    top: 0px;
    left: 0px;
  }

  .border-box-content {
    position: relative;
    width: 100%;
    height: 100%;
  }
}
</style>
