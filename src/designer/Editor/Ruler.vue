<template>
  <SketchRule
    :thick="thick"
    :scale="scale"
    :width="1920"
    :height="1080"
    :startX="startX"
    :startY="startY"
    :lines="lines"
  />
</template>

<script setup lang="ts">
import SketchRule from 'vue3-sketch-ruler'
import 'vue3-sketch-ruler/lib/style.css'

const scale = 1
const startX = 0
const startY = 0
const lines = {
  h: [],
  v: []
}
const thick = 20
</script>

<style lang="less" scoped></style>
