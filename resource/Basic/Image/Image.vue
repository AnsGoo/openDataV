<template>
  <!-- 如果在编辑器模式下，button 按钮不响应点击时间，在父元素中进行拦截 -->
  <div class="bg"></div>
</template>

<script setup lang="ts">
import type { CustomComponent } from '@open-data-v/base'

defineProps<{
  component: CustomComponent
}>()
</script>

<style lang="less" scoped>
.bg {
  @apply w-full h-full;
}
</style>
