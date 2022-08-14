<template>
  <SketchRule
    :thick="16"
    :scale="1"
    :width="width"
    :height="height"
    :startX="startX"
    :startY="startY"
  />
</template>

<script setup lang="ts">
import SketchRule from '../modules/ruler'
defineProps<{
  width: number
  height: number
  startX: number
  startY: number
}>()
</script>
