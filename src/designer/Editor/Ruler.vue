<template>
  <SketchRule
    :thick="thick"
    :scale="scale"
    :width="width"
    :height="height"
    :startX="startX"
    :startY="startY"
    :lines="lines"
  />
</template>

<script setup lang="ts">
import SketchRule from 'vue3-sketch-ruler'
import 'vue3-sketch-ruler/lib/style.css'

defineProps<{
  width: number
  height: number
}>()

const scale = 1
const startX = 0
const startY = 0
const lines = {
  h: [],
  v: []
}
const thick = 20
</script>

<style lang="less" scoped>
:deep(.line) {
  border-left: 1px dashed #37d4cf !important;
}

:deep(.indicator) {
  border-left: 1px dashed #37d4cf !important;
}
</style>
