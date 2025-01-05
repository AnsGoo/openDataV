<template>
  <slot></slot>
</template>

<script setup lang="ts">
import { CONTEXT } from '@open-data-v/base'
import { provide } from 'vue'

provide(CONTEXT, {})
</script>
