<template>
  <x-icon :name="themeIcon" />
</template>
<script lang="ts" setup>
import type { ComputedRef } from 'vue'
import { computed, inject } from 'vue'

const darkTheme = inject<ComputedRef<boolean>>(
  'DarkTheme',
  computed(() => true)
)
const themeIcon = computed<string>(() => (darkTheme.value ? 'sun' : 'moon'))
</script>
