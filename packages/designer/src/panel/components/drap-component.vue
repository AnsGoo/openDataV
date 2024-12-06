<template>
  <div draggable="true" :data-component="component" @dragstart="handleDragStart">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  component: string
}>()

const handleDragStart = (e) => {
  e.dataTransfer.setData('componentName', props.component)
}
</script>
