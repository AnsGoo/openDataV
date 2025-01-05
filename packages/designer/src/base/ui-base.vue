<template>
  <slot></slot>
</template>

<script setup lang="ts">
import { CONTEXT } from '@open-data-v/base'
import { provide } from 'vue'

import { ActionState } from '../state/actions'
import { CanvasState } from '../state/canvas'

const canvasState = new CanvasState()
const actionState = new ActionState(canvasState)
provide(CONTEXT, { canvasState, actionState })
</script>
