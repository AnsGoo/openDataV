<template>
  <div class="dv-decoration-7" ref="mainEl">
    <svg width="21px" height="20px">
      <polyline
        stroke-width="4"
        fill="transparent"
        :stroke="mergedColor[0]"
        points="10, 0 19, 10 10, 20"
      />
      <polyline
        stroke-width="2"
        fill="transparent"
        :stroke="mergedColor[1]"
        points="2, 0 11, 10 2, 20"
      />
    </svg>
    <slot>{{ propValue.text }}</slot>
    <svg width="21px" height="20px">
      <polyline
        stroke-width="4"
        fill="transparent"
        :stroke="mergedColor[0]"
        points="11, 0 2, 10 11, 20"
      />
      <polyline
        stroke-width="2"
        fill="transparent"
        :stroke="mergedColor[1]"
        points="19, 0 10, 10 19, 20"
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
  return [props.propValue.color1, props.propValue.color2] //['#1dc1f5', '#1dc1f5']
})
</script>

<style lang="less" scoped>
.dv-decoration-7 {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}
</style>
