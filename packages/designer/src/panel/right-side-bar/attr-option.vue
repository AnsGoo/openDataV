<template>
  <AttrComponent :mode="mode" :component="curComponent ? curComponent : null" />
</template>

<script setup lang="ts">
import type { CustomComponent } from '@open-data-v/base'
import { ContainerType } from '@open-data-v/base'
import { computed, inject } from 'vue'

import { PANEL_MODEL } from '../../const'
import { useEmpty } from '../../modules'
import { useGraphState } from '../../state'

const props = defineProps<{
  curComponent: CustomComponent
}>()
const graphState = useGraphState()

const mode = inject<ContainerType>(PANEL_MODEL, ContainerType.CARD)
const AttrComponent = computed(() => {
  const panel = graphState.getComponentPanel(props.curComponent.component)
  if (panel) {
    return panel
  }
  return useEmpty('未发现对应的数据面板')
})
</script>
