<template>
  <div class="dv-decoration-11" ref="mainEl">
    <svg :width="width" :height="height">
      <polygon
        :fill="mergedColor[1]"
        :stroke="mergedColor[1]"
        :points="`20 10, 25 4, 55 4 60 10`"
      />

      <polygon
        :fill="mergedColor[1]"
        :stroke="mergedColor[1]"
        :points="`20 ${height - 10}, 25 ${height - 4}, 55 ${height - 4} 60 ${height - 10}`"
      />

      <polygon
        :fill="mergedColor[1]"
        :stroke="mergedColor[1]"
        :points="`${width - 20} 10, ${width - 25} 4, ${width - 55} 4 ${width - 60} 10`"
      />

      <polygon
        :fill="mergedColor[1]"
        :stroke="mergedColor[1]"
        :points="`${width - 20} ${height - 10}, ${width - 25} ${height - 4}, ${width - 55} ${
          height - 4
        } ${width - 60} ${height - 10}`"
      />

      <polygon
        :fill="mergedColor[0]"
        :stroke="mergedColor[0]"
        :points="`
          20 10, 5 ${height / 2} 20 ${height - 10}
          ${width - 20} ${height - 10} ${width - 5} ${height / 2} ${width - 20} 10
        `"
      />

      <polyline
        fill="transparent"
        :stroke="mergedColor[0]"
        :points="`25 18, 15 ${height / 2} 25 ${height - 18}`"
      />

      <polyline
        fill="transparent"
        :stroke="mergedColor[0]"
        :points="`${width - 25} 18, ${width - 15} ${height / 2} ${width - 25} ${height - 18}`"
      />
    </svg>

    <div class="decoration-content">
      {{ propValue.text }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import type { ComponentInfo } from '@/types/component'

const mainEl = ref<ElRef>(null)
const width = ref<number>(200)
const height = ref<number>(60)

const props = defineProps<{
  element: ComponentInfo
  propValue: Recordable<any>
}>()

useResizeObserver(mainEl, (entries) => {
  const entry = entries[0]
  const rect = entry.contentRect
  width.value = rect.width
  height.value = rect.height
})

const mergedColor = computed(() => {
  return [props.propValue.color1, props.propValue.color2] //['#1a98fc', '#2cf7fe']
})
</script>

<style lang="less" scoped>
.dv-decoration-11 {
  // position: relative;
  width: 100%;
  height: 100%;
  display: flex;

  .decoration-content {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
