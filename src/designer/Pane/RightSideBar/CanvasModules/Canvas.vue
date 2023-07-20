<template>
  <Container :config="config" :data="formData" :mode="mode" @change="changed" />
</template>
import Container from '@/designer/modules/form/Container'
<script setup lang="ts">
import { computed, ref } from 'vue'

import Container from '@/designer/modules/form/Container'
import useCanvasState from '@/designer/state/canvas'
import type { ContainerType } from '@/enum'
import type { MetaContainerItem } from '@/types/component'

const canvasState = useCanvasState()
const config = computed<Array<MetaContainerItem>>(() => canvasState.canvasStyleConfig.formItems!)
const mode = computed<ContainerType>(() => canvasState.canvasStyleConfig.mode!)

const formData = ref<Recordable>(canvasState.globalOption)
const changed = (keys: Array<string>, val: any) => {
  canvasState.setCanvasStyle(keys, val)
}
</script>
