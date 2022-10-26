<template>
  <component
    :is="component.component"
    :id="'component' + component.id"
    class="component"
    :style="getComponentStyle(component)"
    :component="component"
  />
</template>

<script setup lang="ts">
import { getComponentStyle } from '@/utils/utils'
import type { BaseComponent } from '@/resource/models'

defineProps<{ component: BaseComponent }>()
</script>

<style lang="less" scoped>
div.component,
img.component,
span.component {
  @apply absolute;
}
</style>
