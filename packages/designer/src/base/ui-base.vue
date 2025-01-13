<template>
  <slot></slot>
</template>

<script setup lang="ts">
import { CONTEXT } from '@open-data-v/base'
import { provide } from 'vue'

import { CanvasState } from '../state/canvas'
import useGraphState from '../state/graph'
import { SelectionState } from '../state/selection'

const graphState = useGraphState()

const canvasState = new CanvasState(graphState)
const selectionState = new SelectionState(canvasState)
provide(CONTEXT, { canvasState, selectionState })
</script>
