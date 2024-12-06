<template>
  <StylePanel :mode="mode" :componentId="curComponent ? curComponent.id : null" />
</template>

<script setup lang="ts">
import type { ContainerType, CustomComponent } from '@open-data-v/base'
import { computed } from 'vue'

import createStyleComponent from './style'

const props = defineProps<{
  curComponent: CustomComponent
}>()

const mode = computed<ContainerType>(() => props.curComponent.defaultViewType)

const StylePanel = createStyleComponent([])
</script>
