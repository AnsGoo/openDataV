<template>
  <n-result
    status="404"
    title="文档正在编写中..."
    description="star一下吧，需要鼓励"
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
