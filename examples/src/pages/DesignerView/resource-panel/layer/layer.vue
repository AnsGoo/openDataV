<template>
  <ul>
    <LayerItem
      v-for="component in componentData"
      :key="component.id"
      class="item"
      :model="component"
    />
  </ul>
</template>
<script setup>
import { useCanvasState } from '@open-data-v/designer'
import { computed } from 'vue'

import LayerItem from './layer-item.vue'

const canvasState = useCanvasState()
const componentData = computed(() => {
  return getLayer(canvasState.componentData)
})

function getLayer(data, layers = []) {
  data.forEach((el) => {
    const item = {
      id: el.id,
      name: el.name,
      children: el.subComponents,
      component: el.component,
      ...el.getExtendedMetaData()
    }
    layers.push(item)
    if (el.isContainer) {
      item.icon = 'container'
      item.children = []
      return getLayer(el.subComponents, item.children)
    }
  })
  console.log(layers)
  return layers
}
</script>

<style scoped>
.item {
  cursor: pointer;
  line-height: 1.5;
}
.bold {
  font-weight: bold;
}
</style>
