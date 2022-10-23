<template>
  <n-card>
    <div class="markdown-body"><slot></slot></div>
  </n-card>
</template>
<script lang="ts" setup>
import { NCard } from 'naive-ui'
import '@/css/markdown.css'
</script>
