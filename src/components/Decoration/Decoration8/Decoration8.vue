<template>
  <div class="dv-decoration-8" v-resize="resizeHandler">
    <svg :width="width" :height="height">
      <polyline
        :stroke="propValue.color1"
        stroke-width="2"
        fill="transparent"
        :points="`${xPos(0)}, 0 ${xPos(30)}, ${height / 2}`"
      />

      <polyline
        :stroke="propValue.color1"
        stroke-width="2"
        fill="transparent"
        :points="`${xPos(20)}, 0 ${xPos(50)}, ${height / 2} ${xPos(width)}, ${height / 2}`"
      />

      <polyline
        :stroke="propValue.color2"
        fill="transparent"
        stroke-width="3"
        :points="`${xPos(0)}, ${height - 3}, ${xPos(200)}, ${height - 3}`"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ComponentInfo } from '@/types/component'
import { Decoration8 } from './type'

const width = ref<number>(200)
const height = ref<number>(60)

const props = defineProps<{
  element: ComponentInfo
  propValue: Decoration8
}>()

const resizeHandler = (entries) => {
  const entry = entries[0]
  const rect = entry.contentRect
  width.value = rect.width
  height.value = rect.height
}

const xPos = (pos: number) => {
  if (!props.propValue.reverse) {
    return pos
  }
  return width.value - pos
}
</script>

<style lang="less" scoped>
.dv-decoration-8 {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>
