<template>
  <div class="attr-list">
    <Container :config="attrKeys" :data="formData" :mode="mode" @change="changed" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import Container from '@/designer/modules/form/Container'
import useCanvasState from '@/designer/state/canvas'
import type { ContainerType } from '@/enum'
import type { CustomComponent } from '@/models'
import type { MetaContainerItem } from '@/types/component'

const props = defineProps<{
  curComponent: CustomComponent
}>()
const canvasState = useCanvasState()

const mode = computed<ContainerType>(() => props.curComponent.defaultViewType.propValue)

interface PropData {
  common: {
    name: string
    component: string
    id: string
  }
  [key: string]: any
}

const formData = computed(() => resetFormData())

const attrKeys = computed<Array<MetaContainerItem>>(() => {
  if (props.curComponent) {
    return props.curComponent.propFromValue
  }
  return []
})

// 样式页面改变，修改当前组件的样式：curComponent.propValue
const changed = (keys: Array<string>, val: any) => {
  canvasState.setCurComponentPropValue(keys, val)
}

const resetFormData = () => {
  const data: PropData = {
    common: {
      name: props.curComponent.name,
      component: props.curComponent.component,
      id: props.curComponent.id
    }
  }

  if (props.curComponent && props.curComponent.propValue) {
    Object.assign(data, props.curComponent.propValue)
  }
  return data
}
</script>

<style scoped>
.attr-list {
  @apply overflow-auto p-1 pt-0 h-full;
  margin-right: 10px;
  backdrop-filter: blur(50px);
}
</style>
