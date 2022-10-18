<template>
  <div class="sider-bar-item">
    <IconPark :name="icon" class="icon" />
    <span class="label">{{ label }}</span>
  </div>
</template>
<script setup lang="ts">
import { IconPark } from '@/plugins/icon'
defineProps<{
  icon: string
  label: string
}>()
</script>

<style scoped lang="less">
.sider-bar-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: nowrap;
  align-items: center;
  font-size: 8px;
  .label {
    font-size: 8px;
  }
}
</style>
