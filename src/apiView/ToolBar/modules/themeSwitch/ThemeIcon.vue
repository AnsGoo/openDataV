<template>
  <x-icon :name="themeIcon" :size="24" />
</template>
<script lang="ts" setup>
import { computed, inject } from 'vue'
import type { ComputedRef } from 'vue'

const darkTheme = inject<ComputedRef<boolean>>(
  'DarkTheme',
  computed(() => true)
)
const themeIcon = computed<string>(() => (darkTheme.value ? 'sun' : 'moon'))
</script>
