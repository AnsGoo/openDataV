<template>
  <div>
    <component
      class="component"
      :is="config.component"
      :style="getStyle(config.style)"
      :propValue="config.propValue"
      :element="config"
      :id="'component' + config.id"
      :subComponents="config.subComponents"
    />
  </div>
</template>

<script setup lang="ts">
import { getStyle } from '@/utils/utils'
import type { ComponentInfo } from '@/types/component'

defineProps<{ config: ComponentInfo }>()
</script>

<style scoped>
@layer components {
  div.component,
  img.component,
  span.component {
    @apply absolute;
  }
}
</style>
