<template>
  <div class="dv-decoration-8" ref="mainEl">
    <svg :width="width" :height="height">
      <polyline
        :stroke="mergedColor[0]"
        stroke-width="2"
        fill="transparent"
        :points="`${xPos(0)}, 0 ${xPos(30)}, ${height / 2}`"
      />

      <polyline
        :stroke="mergedColor[0]"
        stroke-width="2"
        fill="transparent"
        :points="`${xPos(20)}, 0 ${xPos(50)}, ${height / 2} ${xPos(width)}, ${height / 2}`"
      />

      <polyline
        :stroke="mergedColor[1]"
        fill="transparent"
        stroke-width="3"
        :points="`${xPos(0)}, ${height - 3}, ${xPos(200)}, ${height - 3}`"
      />
    </svg>
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
  return [props.propValue.color1, props.propValue.color2] //['#3f96a5', '#3f96a5']
})

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
