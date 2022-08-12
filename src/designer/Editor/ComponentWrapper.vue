<template>
  <component
    class="component"
    :is="component.component"
    :style="getComponentStyle(component)"
    :propValue="component.propValue"
    :componentId="component.id"
    :id="'component' + component.id"
    :subComponents="component.subComponents"
  />
</template>

<script setup lang="ts">
import { getComponentStyle } from '@/utils/utils'
import { BaseComponent } from '@/resource/models'

defineProps<{ component: BaseComponent }>()
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
