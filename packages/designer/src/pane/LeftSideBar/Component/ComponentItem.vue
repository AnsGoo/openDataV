<template>
  <div draggable="true" :data-component="component">
    <div class="select-none">{{ name }}</div>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  component: string
  name: string
}>()
</script>
