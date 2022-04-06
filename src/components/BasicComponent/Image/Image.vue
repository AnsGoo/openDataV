<template>
  <!-- 如果在编辑器模式下，button 按钮不响应点击时间，在父元素中进行拦截 -->
  <img class="bg" :src="propValue.imgUrl" />
</template>

<script setup lang="ts">
import type { ComponentInfo } from '@/types/component'
defineProps<{
  element: ComponentInfo
  propValue: Recordable<string>
}>()
</script>

<style lang="less" scoped>
@layer components {
  .bg {
    @apply w-full h-full;
  }
}
</style>
