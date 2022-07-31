<template>
  <i>
    <component :is="name" :theme="theme" :size="size" :fill="color" v-bind="$attrs" />
  </i>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    name: string
    size?: number
    color?: string
    theme?: string
  }>(),
  {
    size: 18,
    color: '#333',
    theme: 'outline'
  }
)
</script>
