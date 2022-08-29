<template>
  <SketchRule
    :thick="thick"
    :scale="scale"
    :width="width"
    :height="height"
    :startX="startX"
    :startY="startY"
    :lines="lines"
    :isShowReferLine="isShowReferLine"
  />
</template>

<script setup lang="ts">
import SketchRule from '../modules/ruler'
defineProps<{
  width: number
  height: number
  isShowReferLine: boolean
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
