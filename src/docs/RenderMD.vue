<template>
  <n-card>
    <slot></slot>
  </n-card>
</template>
<script lang="ts" setup>
import { NCard } from 'naive-ui'
import '@/css/markdown.css'
</script>
<style lang="css" scoped>
:deep(img) {
  display: block;
  margin: 0 auto;
}
</style>
