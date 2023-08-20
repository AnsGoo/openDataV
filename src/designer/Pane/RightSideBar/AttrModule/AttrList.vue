<template>
  <Container :config="attrKeys" :data="formData" :mode="mode" @change="changed" />
</template>

<script setup lang="ts">
import type { ContainerType, MetaContainerItem } from 'open-data-v/designer'
import { Container, useCanvasState } from 'open-data-v/designer'
import type { CustomComponent } from 'open-data-v/models'
import { computed } from 'vue'

const props = defineProps<{
  curComponent: CustomComponent
}>()
const canvasState = useCanvasState()

const mode = computed<ContainerType>(() => props.curComponent.defaultViewType)

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
