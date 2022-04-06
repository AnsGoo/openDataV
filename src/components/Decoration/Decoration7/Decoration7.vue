<template>
  <div class="dv-decoration-7" v-resize="resizeHandler">
    <svg width="21px" height="20px">
      <polyline
        stroke-width="4"
        fill="transparent"
        :stroke="propValue.color1"
        points="10, 0 19, 10 10, 20"
      />
      <polyline
        stroke-width="2"
        fill="transparent"
        :stroke="propValue.color2"
        points="2, 0 11, 10 2, 20"
      />
    </svg>
    <slot>{{ propValue.text }}</slot>
    <svg width="21px" height="20px">
      <polyline
        stroke-width="4"
        fill="transparent"
        :stroke="propValue.color1"
        points="11, 0 2, 10 11, 20"
      />
      <polyline
        stroke-width="2"
        fill="transparent"
        :stroke="propValue.color2"
        points="19, 0 10, 10 19, 20"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ComponentInfo } from '@/types/component'
import { Decoration7 } from './type'

const width = ref<number>(200)
const height = ref<number>(60)

defineProps<{
  element: ComponentInfo
  propValue: Decoration7
}>()

const resizeHandler = (entries) => {
  const entry = entries[0]
  const rect = entry.contentRect
  width.value = rect.width
  height.value = rect.height
}
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
