<template>
  <div v-resize="resizeHandler" class="dv-decoration-11">
    <svg :width="width" :height="height">
      <polygon
        :fill="propValue.base.color2"
        :stroke="propValue.base.color2"
        :points="`20 10, 25 4, 55 4 60 10`"
      />

      <polygon
        :fill="propValue.base.color2"
        :stroke="propValue.base.color2"
        :points="`20 ${height - 10}, 25 ${height - 4}, 55 ${height - 4} 60 ${height - 10}`"
      />

      <polygon
        :fill="propValue.base.color2"
        :stroke="propValue.base.color2"
        :points="`${width - 20} 10, ${width - 25} 4, ${width - 55} 4 ${width - 60} 10`"
      />

      <polygon
        :fill="propValue.base.color2"
        :stroke="propValue.base.color2"
        :points="`${width - 20} ${height - 10}, ${width - 25} ${height - 4}, ${width - 55} ${
          height - 4
        } ${width - 60} ${height - 10}`"
      />

      <polygon
        :fill="propValue.base.color1"
        :stroke="propValue.base.color1"
        :points="`
          20 10, 5 ${height / 2} 20 ${height - 10}
          ${width - 20} ${height - 10} ${width - 5} ${height / 2} ${width - 20} 10
        `"
      />

      <polyline
        fill="transparent"
        :stroke="propValue.base.color1"
        :points="`25 18, 15 ${height / 2} 25 ${height - 18}`"
      />

      <polyline
        fill="transparent"
        :stroke="propValue.base.color1"
        :points="`${width - 25} 18, ${width - 15} ${height / 2} ${width - 25} ${height - 18}`"
      />
    </svg>

    <div class="decoration-content">{{ propValue.base.text }}</div>
  </div>
</template>

<script setup lang="ts">
import { useProp } from '@/resource/hooks'
import { ref } from 'vue'
import type DecorationComponent from './config'

import type { Decoration } from './type'
const props = defineProps<{
  component: DecorationComponent
}>()

const { propValue } = useProp<Decoration>(props.component)
const width = ref<number>(200)
const height = ref<number>(60)

const resizeHandler = (entry: ResizeObserverEntry) => {
  const rect: DOMRectReadOnly = entry.contentRect
  width.value = rect.width
  height.value = rect.height
}
</script>

<style lang="less" scoped>
.dv-decoration-11 {
  // position: relative;
  width: 100%;
  height: 100%;
  display: flex;

  .decoration-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
