<template>
  <component
    class="component"
    :is="component.component"
    :style="getComponentStyle(component)"
    :component="component"
    :id="'component' + component.id"
  />
</template>

<script setup lang="ts">
import { getComponentStyle } from '@/utils/utils'
import { BaseComponent } from '@/resource/models'

defineProps<{ component: BaseComponent }>()
</script>

<style lang="less" scoped>
div.component,
img.component,
span.component {
  @apply absolute;
}
</style>
