<template>
  <x-icon :name="themeIcon" :size="24" />
</template>
<script lang="ts" setup>
import { computed, inject } from 'vue'

const darkTheme = inject('DarkTheme', true)
const themeIcon = computed<string>(() => (darkTheme ? 'sun' : 'moon'))
</script>
