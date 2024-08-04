<template>
  <StyleComponent :mode="mode" :componentId="curComponent ? curComponent.id : null" />
</template>

<script setup lang="ts">
import type { ContainerType, CustomComponent } from '@open-data-v/base'
import { computed } from 'vue'

import { useEmpty } from '../../../modules'
import { useCanvasState } from '../../../state'

const props = defineProps<{
  curComponent: CustomComponent
}>()
const canvasState = useCanvasState()
const mode = computed<ContainerType>(() => props.curComponent.defaultViewType)

const StyleComponent = computed(() => {
  const panel = canvasState.getComponentPanel(props.curComponent.component)
  if (panel) {
    return panel.styleComponent
  }
  return useEmpty('未发现相应的数据插件')
})
</script>
