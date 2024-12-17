<template>
  <StylePanel :mode="mode" :componentId="curComponent ? curComponent.id : null" />
</template>

<script setup lang="ts">
import type { CustomComponent } from '@open-data-v/base'
import { ContainerType } from '@open-data-v/base'
import { inject } from 'vue'

import { PANEL_MODEL } from '../../../const'
import createStyleComponent from './style'

defineProps<{
  curComponent: CustomComponent
}>()

const mode = inject<ContainerType>(PANEL_MODEL, ContainerType.CARD)

const StylePanel = createStyleComponent([])
</script>
