<template>
  <div class="attr-list">
    <Container :config="config" :data="formData" :mode="mode" @change="changed" />
  </div>
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

const formData = ref<Recordable<any>>(canvasState.canvasGlobalData)
const changed = (keys: Array<string>, val: any) => {
  canvasState.setCanvasStyle(keys, val)
}
</script>

<style scoped>
.attr-list {
  @apply overflow-auto p-1 pt-0 h-full;
  backdrop-filter: blur(50px);
  margin-right: 10px;
}
</style>
