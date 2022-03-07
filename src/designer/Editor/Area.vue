<template>
  <div
    :style="{
      left: start.x + 'px',
      top: start.y + 'px',
      width: width + 'px',
      height: height + 'px'
    }"
    class="area"
  ></div>
</template>

<script setup lang="ts">
import { Vector } from '@/types/common'

defineProps<{
  start: Vector
  width: number
  height: number
}>()
</script>

<style lang="less" scoped>
@layer components {
  .area {
    @apply border border-solid border-blue-400 absolute;
  }
}
</style>
