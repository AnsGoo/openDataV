<template>
  <div class="tree">
    <LayerItem
      v-for="component in componentData"
      :key="component.id"
      class="item"
      :model="component"
      :level="0"
    />
  </div>
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
      component: el,
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
.tree {
  flex: 1;
  overflow: auto;
  padding: 4px 0;
  position: relative;
}
</style>
