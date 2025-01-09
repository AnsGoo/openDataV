<template>
  <slot></slot>
</template>

<script setup lang="ts">
import { CONTEXT } from '@open-data-v/base'
import { provide } from 'vue'

import { CanvasState } from '../state/canvas'
import { SelectionState } from '../state/selection'

const canvasState = new CanvasState()
const selectionState = new SelectionState(canvasState)
provide(CONTEXT, { canvasState, selectionState })
</script>
