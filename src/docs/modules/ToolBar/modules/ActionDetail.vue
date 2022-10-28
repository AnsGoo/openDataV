<template>
  <icon-park :name="icon" size="24" /><span>{{ label }}</span>
</template>
<script lang="ts" setup>
defineProps<{
  icon: string
  label: string
}>()
</script>
