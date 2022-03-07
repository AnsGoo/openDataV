<template>
  <div>
    <component
      class="component"
      :is="component.component"
      :style="getComponentStyle(component)"
      :propValue="component.propValue"
      :element="component"
      :id="'component' + component.id"
      :subComponents="component.subComponents"
    />
  </div>
</template>

<script setup lang="ts">
import { getComponentStyle } from '@/utils/utils'
import type { ComponentInfo } from '@/types/component'

defineProps<{ component: ComponentInfo }>()
</script>

<style lang="less" scoped>
@layer components {
  div.component,
  img.component,
  span.component {
    @apply absolute;
  }
}
</style>
