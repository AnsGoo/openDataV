<template>
  <Container :config="config" :data="formData" :mode="mode" @change="changed" />
</template>
import Container from '@/designer/modules/form/Container'
<script setup lang="ts">
import { computed, ref } from 'vue'

import Container from '@/designer/modules/form/Container'
import useCanvasState from '@/designer/state/canvas'
import type { MetaContainerItem } from '@/designer/type'
import type { ContainerType } from '@/enum'

const canvasState = useCanvasState()
const config = computed<Array<MetaContainerItem>>(() => canvasState.canvasStyleConfig.formItems!)
const mode = computed<ContainerType>(() => canvasState.canvasStyleConfig.mode!)

const formData = ref<Record<string, any>>(canvasState.globalOption)
const changed = (keys: Array<string>, val: any) => {
  canvasState.setCanvasStyle(keys, val)
}
</script>
