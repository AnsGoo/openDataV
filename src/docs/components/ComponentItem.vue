<template>
  <div draggable="true" :data-component="component">
    <div>{{ name }}</div>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  component: string
  name: string
}>()
</script>
