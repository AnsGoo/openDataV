<template>
  <Container :config="config" :data="formData" :mode="mode" @change="changed" />
</template>
<script setup lang="ts">
import { Container, useCanvasState } from 'open-data-v/designer'
import type { ContainerType, MetaContainerItem } from 'open-data-v/models'
import { computed } from 'vue'

const canvasState = useCanvasState()
const config = computed<Array<MetaContainerItem>>(() => canvasState.canvasStyleConfig.formItems!)
const mode = computed<ContainerType>(() => canvasState.canvasStyleConfig.mode!)

const formData = computed<Record<string, any>>(() => canvasState.globalOption)
const changed = (keys: Array<string>, val: any) => {
  canvasState.setCanvasStyle(keys, val)
}
</script>
