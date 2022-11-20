<template>
  <n-result
    status="404"
    title="模块正在开发中..."
    description="star一下，来为OpenDataV加速吧"
    style="height: 100%"
  >
    <template #icon>
      <img src="/errors/404.png" />
    </template>
  </n-result>
</template>
<script lang="ts" setup>
import { NResult } from 'naive-ui'
</script>
